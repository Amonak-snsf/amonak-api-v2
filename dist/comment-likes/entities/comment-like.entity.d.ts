import { User } from "src/users/entities/user.entity";
import { Comment } from "src/comments/entities/comment.entity";
import * as mongoose from 'mongoose';
import { DefaultModel } from "src/utils/default-model";
export declare type CommentLikeDocument = CommentLike & Document;
export declare class CommentLike extends DefaultModel {
    comment: Comment;
    user: User;
}
export declare const CommentLikeSchema: mongoose.Schema<mongoose.Document<CommentLike, any, any>, mongoose.Model<mongoose.Document<CommentLike, any, any>, any, any, any>, any, any>;
