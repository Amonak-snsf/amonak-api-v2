import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/users/entities/user.entity";
import * as mongoose from 'mongoose';
import { Publication } from "src/publications/entities/publication.entity";
import { NotificationType } from "../dto/notification-type.dto";
import { IsIn } from "class-validator";

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  from: User

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  to: User

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Publication' })
  publication_id: Publication

  @Prop({ required: false, type: String })
  content: String;

  @Prop({ required: false, type: String })
  comment: String;

  @Prop({ required: true, type: String, default: NotificationType.all })
  @IsIn([NotificationType.all, NotificationType.comment, NotificationType.friend_request, NotificationType.like, NotificationType.publication, NotificationType.share, NotificationType.welcome])
  type: String;

  @Prop({ required: true, type: Boolean, default: true })
  status: Boolean;

  @Prop({ required: true, default: Date.now })
  created_at: Date;

  @Prop({ required: false })
  seen_at: Date;

  @Prop({ required: false })
  read_at: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);