/* eslint-disable prettier/prettier */
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Friend } from 'src/friends/entities/friend.entity';
import { DefaultModel } from 'src/utils/default-model';
import { AccountType } from '../dto/user-account-type.enum';

export type UserDocument = User & Document;

@Schema()
export class User extends DefaultModel {

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Prop({ required: false, trim: true, type: String })
  firstName: string;

  @Prop({ required: false, trim: true, type: String, uppercase: true })
  lastName: string;

  @Prop({ required: true, trim: true, type: String })
  userName: string;

  @Prop({ required: true, trim: true, type: String, unique: true, lowercase: true })
  email: string;

  @Exclude()
  @Prop({ required: true, trim: true, type: String, select: true })
  password: string;

  @Prop({ required: false, trim: true, type: String })
  dialCode: string;

  @Prop({ required: false, trim: true, type: String })
  phone: string;

  @Prop({ required: false, trim: true, type: String, default: 'M' })
  gender: string;

  @Prop({ required: false, trim: true, type: Date })
  birthDay: string;

  @Prop({ required: false, trim: true, type: String })
  birthPlace: string;

  @Prop(raw({
    destination: { required: false, trim: true, type: String, select: true },
    type: { required: false, trim: true, type: String, select: true },
    extension: { required: false, trim: true, type: String, select: true },
    originalname: { required: false, trim: true, type: String, select: true },
    filename: { required: false, trim: true, type: String, select: true },
    size: { required: false, trim: true, type: Number, select: true},
    url: { required: false, trim: true, type: String, select: true },
  }))
  avatar: Record<string, any>[];

  @Prop({ required: false, trim: true, type: String })
  profession: string;

  @Prop([String])
  sectors: string[];

  @Prop(raw({
    countryName: { required: false, trim: true, type: String },
    countryCode: { required: false, trim: true, type: String },
    state: { required: false, trim: true, type: String },
    city: { required: false, trim: true, type: String },
    postalCode: { required: false, trim: true, type: String },
    street: { required: false, trim: true, type: String },
    fullAddress: { required: false, trim: true, type: String }
  }))
  address: Record<string, any>[];

  @Prop(raw({
    number: { required: false, trim: true, type: String, select: false },
    cvc: { required: false, trim: true, type: String, select: false },
    zip: { required: false, trim: true, type: String, select: false },
    address: { required: false, trim: true, type: String }
  }))
  bankCard: Record<string, any>;

  @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }] })
  friends: Friend[]

  @Prop({ required: false, trim: true, type: Boolean, default: false })
  status: boolean;

  @Prop({ required: false, trim: true, type: String, default: AccountType.default })
  accountType: string;

  @Prop({ required: false, trim: true, type: Boolean, default: false })
  isLog: boolean;

  @Prop({ required: false, trim: true, type: Date })
  lastConnected: Date

  @Prop({ required: false, trim: true, type: Boolean, default: true })
  isFirstTime: boolean;

  @Prop({ required: false, trim: true, type: Boolean, default: true })
  isNewFeed: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
