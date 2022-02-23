import { User } from "src/users/entities/user.entity";
import { Comment } from "src/comments/entities/comment.entity";
import * as mongoose from 'mongoose';
export declare type CommentLikeDocument = CommentLike & Document;
export declare class CommentLike {
    comment_id: Comment;
    user_id: User;
    created_at: Date;
}
export declare const CommentLikeSchema: mongoose.Schema<mongoose.Document<CommentLike, any, any>, mongoose.Model<mongoose.Document<CommentLike, any, any>, any, any, any>, any, any>;
