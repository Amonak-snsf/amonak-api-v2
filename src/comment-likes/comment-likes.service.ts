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

@Injectable()
export class CommentLikesService {
  constructor(@InjectModel(CommentLike.name) private readonly commentLikeModel: Model<CommentLikeDocument>,
    @InjectModel(Comment.name) private readonly commentModel: Model<CommentLikeDocument>,
    private notificationService: NotificationsService,){}

  async create(createCommentLikeDto: CreateCommentLikeDto, res) {
    
    const data = await create(this.commentLikeModel, createCommentLikeDto);

    let content = 'a aimé votre commentaire sur une publication';

    const allLikeOfThisComment = await allDistinct(this.commentLikeModel, 'user', {comment: data.comment});

    if(allLikeOfThisComment){
      for(let value of allLikeOfThisComment){

          content = 'a aimé le commentaire d\'une publication que vous avez aussi aimé';
          if(value && `${value}` !=='' && `${value}` !==createCommentLikeDto.commentCreator){
            await this.notificationService.create({
              from: data.user,
              content: content,
              to: value,
              comment: data.comment,
              type: NotificationType.like
            })
          }
      }
    }

    if(createCommentLikeDto.commentCreator !== `${data.user}`){

        await this.notificationService.create({
        from: data.user,
        content: content,
        to: createCommentLikeDto.commentCreator,
        comment: data.comment,
        type: NotificationType.like
      })
    }
    return res.status(HttpStatus.OK).json(data);
  }

  async findAll(params, res) {
    
    const data = await all(this.commentLikeModel, params);

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(comment: string) {

    return await all(this.commentLikeModel, { comment: comment });
  }

  async update(comment: string, updateCommentLikeDto: UpdateCommentLikeDto, res) {
    
    const data = await put(this.commentLikeModel, updateCommentLikeDto, { comment: comment } );

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(comment: string, params, res) {
    params.comment = comment;

    const data = await destroy(this.commentLikeModel, params);

    return res.status(HttpStatus.OK).json(data);
  }
}
