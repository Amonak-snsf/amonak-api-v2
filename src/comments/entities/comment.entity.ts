import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Publication } from "src/publications/entities/publication.entity";
import { User } from "src/users/entities/user.entity";
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    
    @Prop({ required: false, type: String, trim: true })
    content: String;

    @Prop(raw({
        url: { required: false, trim: true, type: String, select: true },
        type: { required: false, trim: true, type: String, select: true }
    }))
    files: Record<string, any>[];
      
    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Publication' })
    publication_id: Publication

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: User

    @Prop({ required: true, type: Boolean, default: true })
    status: Boolean

    @Prop({ required: true, type: Date, default: Date.now })
    created_at: Date
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
