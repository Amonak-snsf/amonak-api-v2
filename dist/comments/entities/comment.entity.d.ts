import { Publication } from "src/publications/entities/publication.entity";
import { User } from "src/users/entities/user.entity";
import * as mongoose from 'mongoose';
export declare type CommentDocument = Comment & Document;
export declare class Comment {
    content: String;
    files: Record<string, any>[];
    publication_id: Publication;
    user_id: User;
    status: Boolean;
    created_at: Date;
}
export declare const CommentSchema: mongoose.Schema<mongoose.Document<Comment, any, any>, mongoose.Model<mongoose.Document<Comment, any, any>, any, any, any>, any, any>;
