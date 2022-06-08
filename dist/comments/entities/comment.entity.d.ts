import { Publication } from "src/publications/entities/publication.entity";
import { User } from "src/users/entities/user.entity";
import * as mongoose from 'mongoose';
import { DefaultModel } from "src/utils/default-model";
import { Files } from "src/users/dto/file-interface";
export declare type CommentDocument = Comment & Document;
export declare class Comment extends DefaultModel {
    content: string;
    files: Files[];
    publication: Publication;
    user: User;
    status: boolean;
    likes: [];
}
export declare const CommentSchema: mongoose.Schema<mongoose.Document<Comment, any, any>, mongoose.Model<mongoose.Document<Comment, any, any>, any, any, any>, {}, {}>;
