import { User } from "src/users/entities/user.entity";
import * as mongoose from 'mongoose';
import { Notification } from "src/notifications/entities/notification.entity";
import { Files } from "src/users/dto/file-interface";
export declare type MessageDocument = Message & Document;
export declare class Message extends Notification {
    files: Files[];
    deleters: User[];
}
export declare const MessageSchema: mongoose.Schema<mongoose.Document<Message, any, any>, mongoose.Model<mongoose.Document<Message, any, any>, any, any, any>, {}, {}>;
