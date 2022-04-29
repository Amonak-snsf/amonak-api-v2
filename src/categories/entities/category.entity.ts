import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { DefaultModel } from "src/utils/default-model";

export type CategoryDocument = Category & Document;

@Schema()
export class Category extends DefaultModel{

    @Prop({ type: String, required: true, trim: true, unique: true })
    name: String;

    @Prop({ type: String, required: false, trim: true })
    description: String;

    @Prop({ type: String, required: false, trim: true })
    image: String;

    @Prop({ type: Boolean, required: true, default: false })
    status: Boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category)
