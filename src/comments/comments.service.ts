import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PubManagementType } from 'src/publication-managements/dto/publication-managements-type.dto';
import { PublicationManagement, PubManagementDocument } from 'src/publication-managements/entities/publication-management.entity';
import { customFiles, userDataPopulateWithComment, userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, one, put, allDistinct } from 'src/utils/query';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './entities/comment.entity';
import { CommentLikesService } from 'src/comment-likes/comment-likes.service';
import { NotificationType } from "src/notifications/dto/notification-type.dto";
import { NotificationService } from 'src/notification/notification.service';
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
  @InjectModel(PublicationManagement.name) private readonly pubmanegementModel: Model<PubManagementDocument>,
  @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  private notificationsService: NotificationService,
  private notificationService: NotificationsService, 
  private commentLikeService: CommentLikesService
  ){}

// Méthode asynchrone pour créer un commentaire
  async create(createCommentDto: CreateCommentDto, res) {

    const data = await create(this.commentModel, createCommentDto, 'user', userDataPopulateWithTopten());
// Définition du contenu de la notification
    let content = 'comment.commentYourPublication';

// Envoie une notification si l'utilisateur qui commente n'est pas l'auteur de la publication
    if(createCommentDto.publicationCreator !== `${data.user._id}`){

      const publicationCreator = await this.userModel.findById(createCommentDto.publicationCreator).select('fcmToken');

       // Envoi de la notification via FCM
       const notificationPayload = {
        title: 'Commentaire',
        body: `${data.user.userName} a commenté votre publication `,
        token: publicationCreator.fcmToken,  // Vous devez obtenir ce token au préalable
      };
  
      await this.notificationsService.sendPush(notificationPayload);
       /* await this.notificationService.create({
        from: data.user,
        content: content,
        to: createCommentDto.publicationCreator,
        publication: data.publication,
        type: NotificationType.comment
      })*/
    } 

// Récupère tous les utilisateurs qui ont commenté cette publication, pour leur envoyer une notification    
    const allCommentOfThisPublication = await allDistinct(this.commentModel, 'user', {publication: data.publication});
   
// Envoie une notification à tous les autres utilisateurs qui ont commenté la publication
    if(allCommentOfThisPublication){
      for(let value of allCommentOfThisPublication){
          if(value && `${value}` !== createCommentDto.publicationCreator && `${value}` !=='' && `${value}` !== `${data.user._id}`){
            content = 'comment.commentAPublication';

          await this.notificationService.create({
              from: data.user,
              content: content,
              to: value,
              publication: data.publication,
              type: NotificationType.comment
            })
         }
      }
    }
    
    return res.status(HttpStatus.OK).json(data);
  }

  
// Méthode pour récupérer tous les commentaires selon certains paramètres de recherche
  async findAll(params, res) {

    let commentsLikes = []; // Tableau pour stocker les commentaires avec leurs "likes"

    // Si des paramètres de recherche sont fournis, utilise une expression régulière pour filtrer les commentaires
    if(params.search){
      params = { content: { $regex: new RegExp(params.search, 'i') } };
    }

 // Récupère tous les commentaires en fonction des paramètres, avec un tri et une limite, puis les peuple avec les données de l'utilisateur
 let data = await all(this.commentModel, params, null, { _id: -1 }, params.limit, 'user', userDataPopulateWithComment());

 // Pour chaque commentaire, récupère les "likes" associés et les ajoute au tableau
 for(let value of data){
   const likes = await this.commentLikeService.findOne(value._id);
   value.likes = likes;
   commentsLikes.push(value);
 }

 // Retourne la réponse HTTP avec le statut OK et les commentaires avec leurs "likes"
 return res.status(HttpStatus.OK).json(commentsLikes);
}

// Méthode pour récupérer un seul commentaire par son identifiant (_id)
async findOne(_id: string, res) {
 
 // Récupère le commentaire par son identifiant et peuple les données de l'utilisateur
 const data = await one(this.commentModel, { _id: _id }, null, 'user', userDataPopulateWithComment());
 
 // Retourne la réponse HTTP avec le statut OK et le commentaire récupéré
 return res.status(HttpStatus.OK).json(data);
}

// Méthode pour mettre à jour un commentaire par son identifiant (_id)
async update(_id: string, updateCommentDto: UpdateCommentDto, res) {
 
 // Met à jour le commentaire avec les nouvelles données fournies
 const data = await put(this.commentModel, updateCommentDto, { _id: _id });

 // Retourne la réponse HTTP avec le statut OK et les données du commentaire mis à jour
 return res.status(HttpStatus.OK).json(data);
}

// Méthode pour supprimer un commentaire par son identifiant (_id)
async remove(_id: string, res) {
 
 // Supprime le commentaire de la base de données
 const data = await destroy(this.commentModel, { _id: _id });

 // Retourne la réponse HTTP avec le statut OK et les données du commentaire supprimé
 return res.status(HttpStatus.OK).json(data);
}
}