import { Model } from 'mongoose';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PubManagementDocument } from 'src/publication-managements/entities/publication-management.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDocument } from './entities/comment.entity';
import { CommentLikesService } from 'src/comment-likes/comment-likes.service';
export declare class CommentsService {
    private readonly commentModel;
    private readonly pubmanegementModel;
    private notificationService;
    private commentLikeService;
    constructor(commentModel: Model<CommentDocument>, pubmanegementModel: Model<PubManagementDocument>, notificationService: NotificationsService, commentLikeService: CommentLikesService);
    create(createCommentDto: CreateCommentDto, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<any>;
    findOne(_id: string, res: any): Promise<any>;
    update(_id: string, updateCommentDto: UpdateCommentDto, res: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
}
