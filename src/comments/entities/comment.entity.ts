import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Publication } from "src/publications/entities/publication.entity";
import { User } from "src/users/entities/user.entity";
import * as mongoose from 'mongoose';
import { DefaultModel } from "src/utils/default-model";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment extends DefaultModel{
    
    @Prop({ required: false, type: String, trim: true })
    content: String;

    @Prop(raw({
        url: { required: false, trim: true, type: String, select: true },
        type: { required: false, trim: true, type: String, select: true }
    }))
    files: Record<string, any>[];
      
    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Publication' })
    publication: Publication

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ required: true, type: Boolean, default: true })
    status: Boolean
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
