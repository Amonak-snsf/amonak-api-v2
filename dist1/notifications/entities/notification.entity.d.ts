import { User } from "src/users/entities/user.entity";
import * as mongoose from 'mongoose';
import { Publication } from "src/publications/entities/publication.entity";
import { DefaultModel } from "src/utils/default-model";
export declare type NotificationDocument = Notification & Document;
export declare class Notification extends DefaultModel {
    from: User;
    to: User;
    publication: Publication;
    content: String;
    comment: String;
    type: String;
    status: Boolean;
    seenAt: Date;
    readAt: Date;
}
export declare const NotificationSchema: mongoose.Schema<mongoose.Document<Notification, any, any>, mongoose.Model<mongoose.Document<Notification, any, any>, any, any, any>, any, any>;
