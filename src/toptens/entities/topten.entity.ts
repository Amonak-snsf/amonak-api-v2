import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Status } from '../dto/topten-status-interface';

export type ToptenDocument = Topten & Document;

@Schema()
export class Topten {

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User

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
  website: String;

  @Prop({ type: String})
  name: String;

  @Prop({ required: false, trim: true, type: String })
  price: String;

  @Prop({ required: true, enum: Status, default: 'disabled' })
  status: String;
  
  @Prop({ required: true, default: 2})
  end_at: Number;

  @Prop({ required: true, default: Date.now })
  created_at: Date;

  @Prop({ required: true, default: Date.now })
  updated_at: Date;

}

export const ToptenSchema = SchemaFactory.createForClass(Topten);