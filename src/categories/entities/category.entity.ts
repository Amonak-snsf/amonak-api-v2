import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type CategoryDocument = Category & Document;

@Schema()
export class Category {

    @Prop({ type: String, required: true, trim: true, unique: true })
    name: String;

    @Prop({ type: String, required: false, trim: true })
    description: String;

    @Prop({ type: String, required: false, trim: true })
    image: String;

    @Prop({ type: Boolean, required: true, default: false })
    status: Boolean;

    @Prop({ required: false, type: Date, default: Date.now })
    created_at: Date;

    @Prop({ required: false, type: Date, default: Date.now })
    updated_at: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category)
