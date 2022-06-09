import { Model } from 'mongoose';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';
import { CommentLikeDocument } from './entities/comment-like.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
export declare class CommentLikesService {
    private readonly commentLikeModel;
    private readonly commentModel;
    private notificationService;
    constructor(commentLikeModel: Model<CommentLikeDocument>, commentModel: Model<CommentLikeDocument>, notificationService: NotificationsService);
    create(createCommentLikeDto: CreateCommentLikeDto, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<any>;
    findOne(comment: string): Promise<Omit<any, never>[]>;
    update(comment: string, updateCommentLikeDto: UpdateCommentLikeDto, res: any): Promise<any>;
    remove(comment: string, params: any, res: any): Promise<any>;
}
