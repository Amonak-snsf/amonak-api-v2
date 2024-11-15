/* eslint-disable prettier/prettier */
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Status } from '../dto/status-seller-info';
import { DefaultModel } from 'src/utils/default-model';
import { Files } from 'src/users/dto/file-interface';

export type SellerInfoDocument = SellerInfo & Document;

@Schema()
export class SellerInfo extends DefaultModel{

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ required: true, enum: Status })
  status: string;

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
  identityCard: Files[];

  @Prop({ required: false, trim: true, type: String })
  message: string

  @Prop({ required: false, trim: true, type: String })
  email: string;

  @Prop({ required: false, trim: true, type: String })
  phone: string;

  @Prop({ required: false, trim: true, type: String })
  registerNumber: string;
  
  @Prop([raw({
    countryName: { required: false, trim: true, type: String },
    countryCode: { required: false, trim: true, type: String },
    state: { required: false, trim: true, type: String },
    city: { required: false, trim: true, type: String },
    postalCode: { required: false, trim: true, type: String },
    street: { required: false, trim: true, type: String },
    fullAddress: { required: false, trim: true, type: String }
  })])
  address: [];

  @Prop({ type: [String]})
  productNature: string[];

  @Prop({ required: false, trim: true, type: String })
  type: string;
}

export const SellerInfoSchema = SchemaFactory.createForClass(SellerInfo);
