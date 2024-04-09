import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.entity';

export type TokenDocument = Token & Document;

@Schema()
export class Token {

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ required: true })
  token: string;

  @Prop({ required: true, default: Date.now, expires: 86400 })
  createdAt: Date;

}

export const TokenSchema = SchemaFactory.createForClass(Token);
