import * as mongoose from 'mongoose';
import { Category } from "src/categories/entities/category.entity";
import { Files } from "src/users/dto/file-interface";
import { User } from "src/users/entities/user.entity";
import { DefaultModel } from "src/utils/default-model";
export declare type ProductDocument = Product & Document;
export declare class Product extends DefaultModel {
    name: string;
    content: string;
    price: number;
    quantity: number;
    maxWeight: number;
    currency: string;
    files: Files[];
    address: [];
    category: Category;
    user: User;
    status: boolean;
    buys: number;
}
export declare const ProductSchema: mongoose.Schema<mongoose.Document<Product, any, any>, mongoose.Model<mongoose.Document<Product, any, any>, any, any, any>, {}, {}>;
