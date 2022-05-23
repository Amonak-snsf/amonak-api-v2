import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PubManagementType } from 'src/publication-managements/dto/publication-managements-type.dto';
import { PublicationManagement, PubManagementDocument } from 'src/publication-managements/entities/publication-management.entity';
import { customFiles, userDataPopulateWithComment } from 'src/utils/helpers';
import { all, create, destroy, one, put } from 'src/utils/query';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
  @InjectModel(PublicationManagement.name) private readonly pubmanegementModel: Model<PubManagementDocument>,
  private notificationService: NotificationsService
  ){}

  async create(createCommentDto: CreateCommentDto, res) {

    const data = await create(this.commentModel, createCommentDto);

    await new this.pubmanegementModel({ user: data.user, publication: data.publication, type: PubManagementType.follow })
    await this.notificationService.create({
      from: data.user,
      content: "publicationComment",
      to: data.to,
      publication: data.publication
    })
    
    return res.status(HttpStatus.OK).json(data);
  }

  async findAll(params, res) {

    if(params.search){
      params = { content: { $regex: new RegExp(params.search, 'i') } };
    }

    const data = await all(this.commentModel, params, null, { _id: -1 }, params.limit, 'user',userDataPopulateWithComment());

    return res.status(HttpStatus.OK).json(data);
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
