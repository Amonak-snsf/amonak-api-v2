import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Status } from '../dto/status-friend.dto';
import { User } from 'src/users/entities/user.entity';
import { extend } from 'joi';
import { DefaultModel } from 'src/utils/default-model';

export type FriendDocument = Friend & Document;

@Schema()
export class Friend extends DefaultModel{

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  from: User

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  to: User

  @Prop({ required: true, enum: Status })
  status: Number;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
