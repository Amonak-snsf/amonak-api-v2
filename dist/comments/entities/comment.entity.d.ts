import { Publication } from "src/publications/entities/publication.entity";
import { User } from "src/users/entities/user.entity";
import * as mongoose from 'mongoose';
import { DefaultModel } from "src/utils/default-model";
export declare type CommentDocument = Comment & Document;
export declare class Comment extends DefaultModel {
    content: String;
    files: Record<string, any>[];
    publication: Publication;
    user: User;
    status: Boolean;
}
export declare const CommentSchema: mongoose.Schema<mongoose.Document<Comment, any, any>, mongoose.Model<mongoose.Document<Comment, any, any>, any, any, any>, {}, {}>;
