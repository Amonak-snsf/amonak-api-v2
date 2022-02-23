import { Model } from 'mongoose';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PubManagementDocument } from 'src/publication-managements/entities/publication-management.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDocument } from './entities/comment.entity';
export declare class CommentsService {
    private readonly commentModel;
    private readonly pubmanegementModel;
    private notificationService;
    constructor(commentModel: Model<CommentDocument>, pubmanegementModel: Model<PubManagementDocument>, notificationService: NotificationsService);
    create(createCommentDto: CreateCommentDto, files: any, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<any>;
    findOne(id: string, res: any): Promise<any>;
    update(id: string, updateCommentDto: UpdateCommentDto, res: any): Promise<any>;
    remove(id: string, res: any): Promise<any>;
}
