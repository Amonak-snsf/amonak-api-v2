import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Friend } from 'src/friends/entities/friend.entity';
import { AccountType } from '../dto/user-account-type.enum';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Expose()
  get fullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  @Prop({ required: false, trim: true, type: String })
  firstname: string;

  @Prop({ required: false, trim: true, type: String, uppercase: true })
  lastname: string;

  @Prop({ required: true, trim: true, type: String })
  username: string;

  @Prop({ required: true, trim: true, type: String, unique: true, lowercase: true })
  email: string;

  @Exclude()
  @Prop({ required: true, trim: true, type: String, select: true })
  password: string;

  @Prop({ required: false, trim: true, type: String })
  dial_code: string;

  @Prop({ required: false, trim: true, type: String })
  phone: string;

  @Prop({ required: true, trim: true, type: String, default: 'M' })
  gender: string;

  @Prop({ required: false, trim: true, type: Date })
  birthday: string;

  @Prop({ required: false, trim: true, type: String })
  birth_place: string;

  @Prop({ required: false, trim: true, type: String})
  avatar: string;

  @Prop({ required: false, trim: true, type: String })
  profession: string;

  @Prop([String])
  sectors: string[];

  @Prop({ required: false, trim: true, type: String })
  country_infos: string;

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

  @Prop(raw({
    number: { required: false, trim: true, type: String, select: false },
    cvc: { required: false, trim: true, type: String, select: false },
    zip: { required: false, trim: true, type: String, select: false },
    address: { required: false, trim: true, type: String }
  }))
  bank_card: Record<string, any>;

  @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }] })
  friends: Friend[]

  @Prop({ required: false, trim: true, type: Boolean, default: false })
  status: boolean;

  @Prop({ required: false, trim: true, type: String, default: AccountType.default })
  account_type: string;

  @Prop({ required: false, trim: true, type: Boolean, default: false })
  is_log: boolean;

  @Prop({ required: false, trim: true, type: Boolean, default: true })
  is_first_time: boolean;

  @Prop({ required: false, trim: true, type: Boolean, default: true })
  is_new_feed: boolean;

  @Prop({ required: false, trim: true, type: String })
  data: string;

  @Prop({ required: false, default: Date.now, type: Date })
  created_at: Date;

  @Prop({ required: false, default: Date.now, type: Date })
  updated_at: Date;


}

export const UserSchema = SchemaFactory.createForClass(User);