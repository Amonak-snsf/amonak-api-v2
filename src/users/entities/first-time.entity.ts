import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.entity';

export type FirstTimeDocument = FirstTime & Document;

@Schema()
export class FirstTime {

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ required: true })
  display: string;

  @Prop({ required: true, default: false })
  status: Boolean;

  @Prop({ required: true, default: Date.now, expires: 86400 })
  createdAt: Date;

}

export const FirstTimeSchema = SchemaFactory.createForClass(FirstTime);
