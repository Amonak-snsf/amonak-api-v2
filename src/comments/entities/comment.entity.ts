/* eslint-disable prettier/prettier */
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Publication } from "src/publications/entities/publication.entity";
import { User } from "src/users/entities/user.entity";
import * as mongoose from 'mongoose';
import { DefaultModel } from "src/utils/default-model";
import { Files } from "src/users/dto/file-interface";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment extends DefaultModel{
    
    @Prop({ required: false, type: String, trim: true })
    content: string;

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
      
    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Publication' })
    publication: Publication

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ required: true, type: Boolean, default: true })
    status: boolean

    @Prop({ required: false, type: [], default: true })
    likes: []
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
