import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type BiographyDocument = Biography & Document;

@Schema()
export class Biography {

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User

  @Prop({ required: false, trim: true, type: String })
  relationship: string;

  @Prop({ required: false, trim: true, type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  family_member: User[];

  @Prop([String])
  nickname: string[];

  @Prop([String])
  interested_by: string[];

  @Prop([String])
  politics: string[];

  @Prop([String])
  confessions: string[];

  @Prop([String])
  languages: string[];

  @Prop([String])
  web_sites: string[];

  @Prop([String])
  networks: string[];

  @Prop({ required: true, trim: true, type: String, default: 'Public' })
  status: string;

  @Prop({ required: false, default: Date.now })
  created_at: Date;

  @Prop({ required: false, default: Date.now })
  updated_at: Date;

}

export const BiographySchema = SchemaFactory.createForClass(Biography);

