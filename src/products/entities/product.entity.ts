/* eslint-disable prettier/prettier */
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from 'mongoose';
import { Category } from "src/categories/entities/category.entity";
import { Files } from "src/users/dto/file-interface";
import { User } from "src/users/entities/user.entity";
import { DefaultModel } from "src/utils/default-model";

export type ProductDocument = Product & Document;

@Schema()
export class Product extends DefaultModel{

    @Prop({ required: true, type: String, trim: true })
    name: string;

    @Prop({ required: false, type: String, trim: true })
    content: string;

    @Prop({ required: true, type: Number, trim: true})
    price: number;

    @Prop({ required: true, type: Number, trim: true, default: 1 })
    quantity: number;

    @Prop({ required: false, type: Number, trim: true, default: 1 })
    maxWeight: number;

    @Prop({ required: true, type: String, trim: true, default: 'DTN' })
    currency: string;

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
      
    @Prop([raw({
        countryName: { required: false, trim: true, type: String },
        countryCode: { required: false, trim: true, type: String },
        state: { required: false, trim: true, type: String },
        city: { required: false, trim: true, type: String },
        postalCode: { required: false, trim: true, type: String },
        street: { required: false, trim: true, type: String },
        fullAddress: { required: false, trim: true, type: String }
    })])
    address: [];

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ required: true, type: Boolean, default: false })
    status: boolean
}

export const ProductSchema = SchemaFactory.createForClass(Product);