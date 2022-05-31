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

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
  @InjectModel(PublicationManagement.name) private readonly pubmanegementModel: Model<PubManagementDocument>,
  private notificationService: NotificationsService,
  private commentLikeService: CommentLikesService
  ){}

  async create(createCommentDto: CreateCommentDto, res) {

    const data = await create(this.commentModel, createCommentDto, 'user', userDataPopulateWithTopten());

    let content = 'a commenté votre publication';

    const allCommentOfThisPublication = await allDistinct(this.commentModel, 'user', {publication: data.publication});

    if(allCommentOfThisPublication){
      for(let value of allCommentOfThisPublication){

          content = 'a commenté une publication que vous avez aussi commenté';
          if(value && `${value}` !== createCommentDto.publicationCreator && `${value}` !==''){
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

    if(createCommentDto.publicationCreator !== `${data.user._id}`){

        await this.notificationService.create({
        from: data.user,
        content: content,
        to: createCommentDto.publicationCreator,
        publication: data.publication,
        type: NotificationType.comment
      })
    }

    return res.status(HttpStatus.OK).json(data);
  }

  async findAll(params, res) {

    let commentsLikes = [];

    if(params.search){
      params = { content: { $regex: new RegExp(params.search, 'i') } };
    }

    let data = await all(this.commentModel, params, null, { _id: -1 }, params.limit, 'user',userDataPopulateWithComment());

    for(let value of data){
      const likes = await this.commentLikeService.findOne(value._id);
      value.likes = likes;
      commentsLikes.push(value);
    }

    return res.status(HttpStatus.OK).json(commentsLikes);
  }

  async findOne(_id: string, res) {
    
    const data = await one(this.commentModel, { _id: _id }, null, 'user', userDataPopulateWithComment());
    
    return res.status(HttpStatus.OK).json(data);
  }

  async update(_id: string, updateCommentDto: UpdateCommentDto, res) {
    
    const data = await put(this.commentModel, updateCommentDto, { _id: _id });

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(_id: string, res) {
    
    const data = await destroy(this.commentModel, { _id: _id });

    return res.status(HttpStatus.OK).json(data);
  }
}
