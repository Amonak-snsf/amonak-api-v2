import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Status } from '../dto/topten-status-interface';
import { DefaultModel } from 'src/utils/default-model';

export type ToptenDocument = Topten & Document;

@Schema()
export class Topten extends DefaultModel {

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  followers: User[]

  @Prop(raw({
    url: { required: false, trim: true, type: String, select: true },
    type: { required: false, trim: true, type: String, select: true }
  }))
  files: Record<string, any>[];

  @Prop({ required: false, trim: true, type: String })
  message: String

  @Prop({ required: false, trim: true, type: String })
  company: String;

  @Prop({ required: true, trim: true, type: Number })
  duration: Number;

  @Prop({ required: false, trim: true, type: String })
  webSites: String;

  @Prop({ type: String})
  name: String;

  @Prop({ required: false, trim: true, type: String })
  price: String;

  @Prop({ required: true, enum: Status, default: 'disabled' })
  status: String;
  
  @Prop({ required: false, default: 2})
  endAt: Number;

}

export const ToptenSchema = SchemaFactory.createForClass(Topten);