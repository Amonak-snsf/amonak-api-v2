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

  async create(createCommentDto: CreateCommentDto, files, res) {

    if(files){
      createCommentDto.files = customFiles(files);
    }

    const data = await create(this.commentModel, createCommentDto);

    await new this.pubmanegementModel({ user_id: data.user_id, publication_id: data.publication_id, type: PubManagementType.follow })
    await this.notificationService.create({
      from: data.user_id,
      content: "publicationComment",
      to: data.to,
      publication: data.publication_id
    })
    
    return res.status(HttpStatus.OK).json(data);
  }

  async findAll(params, res) {

    if(params.search){
      params = { content: { $regex: new RegExp(params.search, 'i') } };
    }

    const data = await all(this.commentModel, params, null, { created_at: -1 }, params.limit, 'user_id',userDataPopulateWithComment());

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(id: string, res) {
    
    const data = await one(this.commentModel, { _id: id }, null, 'user_id', userDataPopulateWithComment());

    return res.status(HttpStatus.OK).json(data);
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, res) {
    
    const data = await put(this.commentModel, updateCommentDto, { _id: id });

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(id: string, res) {
    
    const data = await destroy(this.commentModel, { _id: id });

    return res.status(HttpStatus.OK).json(data);
  }
}
