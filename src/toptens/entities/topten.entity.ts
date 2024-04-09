/* eslint-disable prettier/prettier */
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Status } from '../dto/topten-status-interface';
import { DefaultModel } from 'src/utils/default-model';
import { Files } from 'src/users/dto/file-interface';

export type ToptenDocument = Topten & Document;

@Schema()
export class Topten extends DefaultModel {

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  followers: User[]

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

  @Prop({ required: false, trim: true, type: String })
  content: string

  @Prop({ required: false, trim: true, type: String })
  company: string;

  @Prop({ required: false, trim: true, type: Number })
  duration: number;

  @Prop({ required: false, trim: true, type: String })
  webSites: string;

  @Prop({ type: String})
  name: string;

  @Prop({ required: false, trim: true, type: String })
  price: string;

  @Prop({ required: true, enum: Status, default: 'disabled' })
  status: string;
  
  @Prop({ required: false, default: 2})
  endAt: number;

}

export const ToptenSchema = SchemaFactory.createForClass(Topten);