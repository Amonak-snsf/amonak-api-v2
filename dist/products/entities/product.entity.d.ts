import * as mongoose from 'mongoose';
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
export declare type ProductDocument = Product & Document;
export declare class Product {
    name: String;
    content: String;
    price: Number;
    quantity: Number;
    max_weight: Number;
    purchase: Number;
    currency: String;
    files: Record<string, any>[];
    address: Record<string, any>;
    category_id: Category;
    user_id: User;
    status: Boolean;
    created_at: Date;
    updated_at: Date;
}
export declare const ProductSchema: mongoose.Schema<mongoose.Document<Product, any, any>, mongoose.Model<mongoose.Document<Product, any, any>, any, any, any>, any, any>;
