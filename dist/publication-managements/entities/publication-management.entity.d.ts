import { Publication } from "src/publications/entities/publication.entity";
import * as mongoose from 'mongoose';
import { User } from "src/users/entities/user.entity";
import { DefaultModel } from "src/utils/default-model";
export declare type PubManagementDocument = PublicationManagement & Document;
export declare class PublicationManagement extends DefaultModel {
    publication: Publication;
    user: User;
    type: string;
    reason: string;
    status: boolean;
}
export declare const PubManagementSchema: mongoose.Schema<mongoose.Document<PublicationManagement, any, any>, mongoose.Model<mongoose.Document<PublicationManagement, any, any>, any, any, any>, {}, {}, any>;
