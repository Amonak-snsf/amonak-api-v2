import { Model } from 'mongoose';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';
import { CommentLikeDocument } from './entities/comment-like.entity';
export declare class CommentLikesService {
    private readonly commentModel;
    constructor(commentModel: Model<CommentLikeDocument>);
    create(createCommentLikeDto: CreateCommentLikeDto, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<any>;
    findOne(comment_id: string, res: any): Promise<any>;
    update(comment_id: string, updateCommentLikeDto: UpdateCommentLikeDto, res: any): Promise<any>;
    remove(comment_id: string, params: any, res: any): Promise<any>;
}
