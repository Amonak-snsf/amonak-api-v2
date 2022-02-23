import { Document } from "mongoose";
export declare type CategoryDocument = Category & Document;
export declare class Category {
    name: String;
    description: String;
    image: String;
    status: Boolean;
    created_at: Date;
    updated_at: Date;
}
export declare const CategorySchema: import("mongoose").Schema<Document<Category, any, any>, import("mongoose").Model<Document<Category, any, any>, any, any, any>, any, any>;
