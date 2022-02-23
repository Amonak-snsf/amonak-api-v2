import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Status } from '../dto/status-friend.dto';
import { User } from 'src/users/entities/user.entity';

export type FriendDocument = Friend & Document;

@Schema()
export class Friend {

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  from: User

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  to: User

  @Prop({ required: true, enum: Status })
  status: Number;

  @Prop({ required: true, default: Date.now })
  created_at: Date;

  @Prop({ required: true, default: Date.now })
  updated_at: Date;

}

export const FriendSchema = SchemaFactory.createForClass(Friend);
