/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/users/entities/user.entity";
import * as mongoose from 'mongoose';
import { Publication } from "src/publications/entities/publication.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { NotificationType } from "../dto/notification-type.dto";
import { IsIn } from "class-validator";
import { DefaultModel } from "src/utils/default-model";

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification extends DefaultModel{

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  from: User

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  to: User

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Publication' })
  publication: Publication

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  comment: Comment

  @Prop({ required: false, type: String })
  content: string;

  @Prop({ required: true, type: String, default: NotificationType.all })
  @IsIn([NotificationType.all, NotificationType.follow, NotificationType.comment, NotificationType.friendRequest, NotificationType.like, NotificationType.publication, NotificationType.share, NotificationType.welcome])
  type: string;

  @Prop({ required: true, type: Boolean, default: true })
  status: boolean;

  @Prop({ required: false })
  seenAt: Date;

  @Prop({ required: false })
  readAt: Date;

  @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  deleters: User[]
    
  @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  readers: User[]
}
  
export const NotificationSchema = SchemaFactory.createForClass(Notification);
