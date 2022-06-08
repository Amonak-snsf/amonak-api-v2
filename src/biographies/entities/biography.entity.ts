import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { User } from "src/users/entities/user.entity";
import { DefaultModel } from "src/utils/default-model";

export type BiographyDocument = Biography & Document;

@Schema()
export class Biography extends DefaultModel {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;

  @Prop({ required: false, trim: true, type: String })
  relationShip: string;

  @Prop({
    required: false,
    trim: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  })
  familyMember: User[];

  @Prop([String])
  nickname: string[];

  @Prop([String])
  interestedBy: string[];

  @Prop([String])
  politics: string[];

  @Prop([String])
  confessions: string[];

  @Prop([String])
  languages: string[];

  @Prop([String])
  webSites: string[];

  @Prop([String])
  networks: string[];

  @Prop({ required: true, trim: true, type: String, default: "public" })
  status: string;
}

export const BiographySchema = SchemaFactory.createForClass(Biography);
