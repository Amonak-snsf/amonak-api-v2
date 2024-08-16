import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { all, create, destroy, one, put, allDistinct } from 'src/utils/query';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';
import { CommentLike, CommentLikeDocument } from './entities/comment-like.entity';
import { Comment, CommentDocument } from 'src/comments/entities/comment.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationType } from "src/notifications/dto/notification-type.dto";
import { NotificationService } from 'src/notification/notification.service';
import { UsersService } from 'src/users/users.service';
import { User, UserDocument } from 'src/users/entities/user.entity';
@Injectable()
export class CommentLikesService {
  constructor(@InjectModel(CommentLike.name) private readonly commentLikeModel: Model<CommentLikeDocument>,
    @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>, @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private notificationService: NotificationsService, private notificationsService: NotificationService, private userService: UsersService,){}

  /**
   * Cette méthode gère la création d'un "like" sur un commentaire.
   * Si un like de l'utilisateur sur le même commentaire existe déjà, il le supprime.
   * Sinon, il ajoute un nouveau like.
   */

  async create(createCommentLikeDto: CreateCommentLikeDto, res) {
    let data;
// Recherche des likes existants pour le même commentaire et utilisateur.
    const mycommentsLikes = await this.findAll({comment: createCommentLikeDto.comment, user: createCommentLikeDto.user})
// Si un like existe déjà, il est supprimé.
    if(mycommentsLikes && mycommentsLikes[0]){
      this.remove(mycommentsLikes[0]._id, {});
    }
// Si aucun like n'existe, un nouveau like est créé.
    else{
      data = await create(this.commentLikeModel, createCommentLikeDto);
    }
// Contenu de la notification à envoyer au créateur du commentaire.
    let content = 'comment.likeYourComment';
    const commentCreator = await this.userModel.findById(createCommentLikeDto.commentCreator).select('fcmToken');
    const userId = createCommentLikeDto.user;
      const user = await this.userService.findOne(userId); // Suppose que findOne renvoie un utilisateur avec un champ 'email'
      const userName = user?.userName;
    const notificationPayload = {
      title: '',
      body: `${userName} a aimé votre commentaire `,
      token: commentCreator.fcmToken,  // Vous devez obtenir ce token au préalable
    };

    await this.notificationsService.sendPush(notificationPayload);
   const notificationBody = {
      from: createCommentLikeDto.user,
      content: content,
      to: createCommentLikeDto.commentCreator,
      comment: createCommentLikeDto.comment,
      type: NotificationType.like
    }
     

// Recherche de tous les utilisateurs ayant liké ce commentaire.
    const allLikeOfThisComment = await allDistinct(this.commentLikeModel, 'user', {comment: createCommentLikeDto.comment});
    const comment = await one(this.commentModel, { _id: createCommentLikeDto.comment });
// Si le commentaire est associé à une publication, ajoute cette information au corps de la notification.
    if(comment && comment.publication){
      notificationBody['publication'] =  comment.publication;
    }
// Envoie des notifications aux autres utilisateurs qui ont liké ce commentaire.
    if(allLikeOfThisComment){
      for(let value of allLikeOfThisComment){
          if(value && `${value}` !=='' && `${value}` !==createCommentLikeDto.commentCreator && `${value}` !== `${data.user._id}`){
            content = 'comment.likeAPublicationcomment';
            /*notificationBody['content'] =  content;
            await this.notificationService.create({
              ...notificationBody,
              to: value // Envoie de la notification à cet utilisateur spécifique.
            })*/
          }
      }
    }
// Envoie une notification au créateur du commentaire, à condition qu'il ne soit pas celui qui a liké.
    if(createCommentLikeDto.commentCreator !== `${createCommentLikeDto.user}`){

        await this.notificationService.create(notificationBody)
    }
    // Retourne la réponse avec le statut 200 OK et les données du like créé.
    return res.status(HttpStatus.OK).json(data);
  }

    /**
   * Méthode pour trouver tous les likes sur les commentaires qui correspondent à certains critères.
   * Si `res` est fourni, renvoie les données via la réponse HTTP.
   */

  async findAll(params, res=null) {
    
    const data = await all(this.commentLikeModel, params);

    if(res)return res.status(HttpStatus.OK).json(data);
    if(!res)return data;
  }

   
  //Méthode pour trouver tous les likes associés à un commentaire spécifique.
   
  async findOne(comment: string) {

    return await all(this.commentLikeModel, { comment: comment });
  }

  /**
   * Méthode pour mettre à jour un like sur un commentaire.
   * La mise à jour est basée sur le commentaire lui-même.
   */
  async update(comment: string, updateCommentLikeDto: UpdateCommentLikeDto, res) {
    
    const data = await put(this.commentLikeModel, updateCommentLikeDto, { comment: comment } );

    return res.status(HttpStatus.OK).json(data);
  }

  //Méthode pour supprimer un like en fonction de son ID.

  async remove(_id: string, params, res=null) {

    const data = await destroy(this.commentLikeModel, { _id: _id });

    if(res)return res.status(HttpStatus.OK).json(data);
    if(!res)return data;
  }
}
