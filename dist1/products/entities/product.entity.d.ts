import * as mongoose from 'mongoose';
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { DefaultModel } from "src/utils/default-model";
export declare type ProductDocument = Product & Document;
export declare class Product extends DefaultModel {
    name: String;
    content: String;
    price: Number;
    quantity: Number;
    maxWeight: Number;
    purchase: Number;
    currency: String;
    files: Record<string, any>[];
    address: Record<string, any>;
    category: Category;
    user: User;
    status: Boolean;
}
export declare const ProductSchema: mongoose.Schema<mongoose.Document<Product, any, any>, mongoose.Model<mongoose.Document<Product, any, any>, any, any, any>, any, any>;
