import { User } from "src/users/entities/user.entity";
import * as mongoose from 'mongoose';
import { Publication } from "src/publications/entities/publication.entity";
export declare type NotificationDocument = Notification & Document;
export declare class Notification {
    from: User;
    to: User;
    publication_id: Publication;
    content: String;
    comment: String;
    type: String;
    status: Boolean;
    created_at: Date;
    seen_at: Date;
    read_at: Date;
}
export declare const NotificationSchema: mongoose.Schema<mongoose.Document<Notification, any, any>, mongoose.Model<mongoose.Document<Notification, any, any>, any, any, any>, any, any>;
