/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/users/entities/user.entity";
import { Comment } from "src/comments/entities/comment.entity";
import * as mongoose from 'mongoose';
import { DefaultModel } from "src/utils/default-model";

export type CommentLikeDocument = CommentLike & Document;

@Schema()
export class CommentLike extends DefaultModel{

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
    comment: Comment

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
}

export const CommentLikeSchema = SchemaFactory.createForClass(CommentLike)
