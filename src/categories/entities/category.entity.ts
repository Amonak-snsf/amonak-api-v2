/* eslint-disable prettier/prettier */
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { Files } from "src/users/dto/file-interface";
import { DefaultModel } from "src/utils/default-model";

export type CategoryDocument = Category & Document;

@Schema()
export class Category extends DefaultModel{

    @Prop({ type: String, required: true, trim: true, unique: true })
    name: string;

    @Prop({ type: String, required: false, trim: true })
    description: string;

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

    @Prop({ type: Boolean, required: true, default: false })
    status: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category)
