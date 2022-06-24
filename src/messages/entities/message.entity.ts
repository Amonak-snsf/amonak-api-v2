/* eslint-disable prettier/prettier */
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/users/entities/user.entity";
import * as mongoose from 'mongoose';
import { Notification } from "src/notifications/entities/notification.entity";
import { Files } from "src/users/dto/file-interface";

export type MessageDocument = Message & Document;

@Schema()
export class Message extends Notification{

    @Prop([
        raw({
        destination: { required: false, trim: true, type: String, select: true },
        type: { required: false, trim: true, type: String, select: true },
        extension: { required: false, trim: true, type: String, select: true },
        originalname: { required: false, trim: true, type: String, select: true },
        filename: { required: false, trim: true, type: String, select: true },
        size: { required: false, trim: true, type: Number, select: true},
        url: { required: false, trim: true, type: String, select: true },
        })
    ])
    files: Files[];

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    fromPoulate?: User;

    @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    deleters: User[]
}

export const MessageSchema = SchemaFactory.createForClass(Message);
