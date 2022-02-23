import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Status } from '../dto/status-seller-info';

export type SellerInfoDocument = SellerInfo & Document;

@Schema()
export class SellerInfo {

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User

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
  identity_card: Record<string, any>;

  @Prop({ required: false, trim: true, type: String })
  message: String

  @Prop({ required: false, trim: true, type: String })
  email: String;

  @Prop({ required: false, trim: true, type: String })
  phone_number: String;

  @Prop({ required: false, trim: true, type: String })
  register_number: String;
  
  @Prop(raw({
    country_name: { required: false, trim: true, type: String },
    country_code: { required: false, trim: true, type: String },
    state: { required: false, trim: true, type: String },
    city: { required: false, trim: true, type: String },
    postal_code: { required: false, trim: true, type: String },
    street: { required: false, trim: true, type: String },
    full_address: { required: false, trim: true, type: String }
  }))
  address: Record<string, any>;

  @Prop({ type: [String]})
  product_nature: String[];

  @Prop({ required: false, trim: true, type: String })
  type: String;

  @Prop({ required: true, default: Date.now, expires: 86400 })
  created_at: Date;

  @Prop({ required: true, default: Date.now, expires: 86400 })
  updated_at: Date;

}

export const SellerInfoSchema = SchemaFactory.createForClass(SellerInfo);
