import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from 'mongoose';
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";

export type ProductDocument = Product & Document;

@Schema()
export class Product {

    @Prop({ required: true, type: String, trim: true })
    name: String;

    @Prop({ required: false, type: String, trim: true })
    content: String;

    @Prop({ required: true, type: Number, trim: true})
    price: Number;

    @Prop({ required: true, type: Number, trim: true, default: 1 })
    quantity: Number;

    @Prop({ required: false, type: Number, trim: true, default: 0 })
    max_weight: Number;

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
        country_name: { required: false, trim: true, type: String },
        country_code: { required: false, trim: true, type: String },
        state: { required: false, trim: true, type: String },
        city: { required: false, trim: true, type: String },
        postal_code: { required: false, trim: true, type: String },
        street: { required: false, trim: true, type: String },
        full_address: { required: false, trim: true, type: String }
    }))
    address: Record<string, any>;

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category_id: Category

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: User

    @Prop({ required: true, type: Boolean, default: false })
    status: Boolean

    @Prop({ required: false, default: Date.now })
    created_at: Date;

    @Prop({ required: false, default: Date.now })
    updated_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);