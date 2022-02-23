import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { all, create, destroy, one, put } from 'src/utils/query';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';
import { CommentLike, CommentLikeDocument } from './entities/comment-like.entity';

@Injectable()
export class CommentLikesService {
  constructor(@InjectModel(CommentLike.name) private readonly commentModel: Model<CommentLikeDocument>){}

  async create(createCommentLikeDto: CreateCommentLikeDto, res) {
    
    const data = await create(this.commentModel, createCommentLikeDto);

    return res.status(HttpStatus.OK).json(data);
  }

  async findAll(params, res) {
    
    const data = await all(this.commentModel, params);

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(comment_id: string, res) {

    const data = await one(this.commentModel, { comment_id: comment_id });

    return res.status(HttpStatus.OK).json(data);
  }

  async update(comment_id: string, updateCommentLikeDto: UpdateCommentLikeDto, res) {
    
    const data = await put(this.commentModel, updateCommentLikeDto, { comment_id: comment_id } );

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(comment_id: string, params, res) {
    params.comment_id = comment_id;

    const data = await destroy(this.commentModel, params);

    return res.status(HttpStatus.OK).json(data);
  }
}
