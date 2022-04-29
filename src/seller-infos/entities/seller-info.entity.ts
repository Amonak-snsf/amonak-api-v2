import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Status } from '../dto/status-seller-info';
import { DefaultModel } from 'src/utils/default-model';

export type SellerInfoDocument = SellerInfo & Document;

@Schema()
export class SellerInfo extends DefaultModel{

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ required: true, enum: Status })
  status: Number;

  @Prop(raw({
    url: { required: false, trim: true, type: String, select: true },
    type: { required: false, trim: true, type: String, select: true }
  }))
  files: Record<string, any>[];

  @Prop(raw({
    url: { required: false, trim: true, type: String, select: true },
    type: { required: false, trim: true, type: String, select: true }
  }))
  identityCard: Record<string, any>;

  @Prop({ required: false, trim: true, type: String })
  message: String

  @Prop({ required: false, trim: true, type: String })
  email: String;

  @Prop({ required: false, trim: true, type: String })
  phone: String;

  @Prop({ required: false, trim: true, type: String })
  registerNumber: String;
  
  @Prop(raw({
    countryName: { required: false, trim: true, type: String },
    countryCode: { required: false, trim: true, type: String },
    state: { required: false, trim: true, type: String },
    city: { required: false, trim: true, type: String },
    postalCode: { required: false, trim: true, type: String },
    street: { required: false, trim: true, type: String },
    fullAddress: { required: false, trim: true, type: String }
  }))
  address: Record<string, any>;

  @Prop({ type: [String]})
  productNature: String[];

  @Prop({ required: false, trim: true, type: String })
  type: String;
}

export const SellerInfoSchema = SchemaFactory.createForClass(SellerInfo);
