import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/users/entities/user.entity";
import { Comment } from "src/comments/entities/comment.entity";
import * as mongoose from 'mongoose';

export type CommentLikeDocument = CommentLike & Document;

@Schema()
export class CommentLike {

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
    comment_id: Comment

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: User

    @Prop({ required: true, type: Date, default: Date.now })
    created_at: Date
}

export const CommentLikeSchema = SchemaFactory.createForClass(CommentLike)
