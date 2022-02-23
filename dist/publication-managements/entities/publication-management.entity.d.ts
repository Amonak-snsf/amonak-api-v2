import { Publication } from "src/publications/entities/publication.entity";
import * as mongoose from 'mongoose';
import { User } from "src/users/entities/user.entity";
export declare type PubManagementDocument = PublicationManagement & Document;
export declare class PublicationManagement {
    publication_id: Publication;
    user_id: User;
    type: String;
    reason: String;
    status: String;
    created_at: Date;
}
export declare const PubManagementSchema: mongoose.Schema<mongoose.Document<PublicationManagement, any, any>, mongoose.Model<mongoose.Document<PublicationManagement, any, any>, any, any, any>, any, any>;
