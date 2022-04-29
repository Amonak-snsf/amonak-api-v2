import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from 'mongoose';
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { DefaultModel } from "src/utils/default-model";

export type ProductDocument = Product & Document;

@Schema()
export class Product extends DefaultModel{

    @Prop({ required: true, type: String, trim: true })
    name: String;

    @Prop({ required: false, type: String, trim: true })
    content: String;

    @Prop({ required: true, type: Number, trim: true})
    price: Number;

    @Prop({ required: true, type: Number, trim: true, default: 1 })
    quantity: Number;

    @Prop({ required: false, type: Number, trim: true, default: 0 })
    maxWeight: Number;

    @Prop({ required: false, type: Number, trim: true, default: 0 })
    purchase: Number;

    @Prop({ required: true, type: String, trim: true, default: 'DTN' })
    currency: String;

    @Prop(raw({
        url: { required: false, trim: true, type: String, select: true },
        type: { required: false, trim: true, type: String, select: true }
    }))
    files: Record<string, any>[];
      
    @Prop(raw({
        countryName: { required: false, trim: true, type: String },
        countryCode: { required: false, trim: true, type: String },
        state: { required: false, trim: true, type: String },
        city: { required: false, trim: true, type: String },
        postalCode: { required: false, trim: true, type: String },
        street: { required: false, trim: true, type: String },
        fullAddress: { required: false, trim: true, type: String }
    }))
    address: Record<string, any>;

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ required: true, type: Boolean, default: false })
    status: Boolean
}

export const ProductSchema = SchemaFactory.createForClass(Product);