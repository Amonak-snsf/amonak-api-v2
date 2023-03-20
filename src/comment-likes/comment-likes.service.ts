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
    @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
    private notificationService: NotificationsService,){}

  async create(createCommentLikeDto: CreateCommentLikeDto, res) {
    let data;
    const mycommentsLikes = await this.findAll({comment: createCommentLikeDto.comment, user: createCommentLikeDto.user})
    if(mycommentsLikes && mycommentsLikes[0]){
      this.remove(mycommentsLikes[0]._id, {});
    }else{
      data = await create(this.commentLikeModel, createCommentLikeDto);
    }

    let content = 'comment.likeYourComment';
    const notificationBody = {
      from: createCommentLikeDto.user,
      content: content,
      to: createCommentLikeDto.commentCreator,
      comment: createCommentLikeDto.comment,
      type: NotificationType.like
    }

    const allLikeOfThisComment = await allDistinct(this.commentLikeModel, 'user', {comment: createCommentLikeDto.comment});
    const comment = await one(this.commentModel, { _id: createCommentLikeDto.comment });
    if(comment && comment.publication){
      notificationBody['publication'] =  comment.publication;
    }

    if(allLikeOfThisComment){
      for(let value of allLikeOfThisComment){
          if(value && `${value}` !=='' && `${value}` !==createCommentLikeDto.commentCreator && `${value}` !== `${data.user._id}`){
            content = 'comment.likeAPublicationcomment';
            notificationBody['content'] =  content;
            await this.notificationService.create({
              ...notificationBody,
              to: value
            })
          }
      }
    }

    if(createCommentLikeDto.commentCreator !== `${createCommentLikeDto.user}`){

        await this.notificationService.create(notificationBody)
    }
    return res.status(HttpStatus.OK).json(data);
  }

  async findAll(params, res=null) {
    
    const data = await all(this.commentLikeModel, params);

    if(res)return res.status(HttpStatus.OK).json(data);
    if(!res)return data;
  }

  async findOne(comment: string) {

    return await all(this.commentLikeModel, { comment: comment });
  }

  async update(comment: string, updateCommentLikeDto: UpdateCommentLikeDto, res) {
    
    const data = await put(this.commentLikeModel, updateCommentLikeDto, { comment: comment } );

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(_id: string, params, res=null) {

    const data = await destroy(this.commentLikeModel, { _id: _id });

    if(res)return res.status(HttpStatus.OK).json(data);
    if(!res)return data;
  }
}
