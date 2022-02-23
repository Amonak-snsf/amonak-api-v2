import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/users/entities/user.entity";
import * as mongoose from 'mongoose';
import { Notification } from "src/notifications/entities/notification.entity";

export type MessageDocument = Message & Document;

@Schema()
export class Message extends Notification{

    @Prop(raw({
        url: { required: false, trim: true, type: String, select: true },
        type: { required: false, trim: true, type: String, select: true }
    }))
    files: Record<string, any>[];

    @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    deleters: User[]
}

export const MessageSchema = SchemaFactory.createForClass(Message);
