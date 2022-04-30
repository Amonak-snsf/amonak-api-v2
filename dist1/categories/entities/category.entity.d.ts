import { Document } from "mongoose";
import { DefaultModel } from "src/utils/default-model";
export declare type CategoryDocument = Category & Document;
export declare class Category extends DefaultModel {
    name: String;
    description: String;
    image: String;
    status: Boolean;
}
export declare const CategorySchema: import("mongoose").Schema<Document<Category, any, any>, import("mongoose").Model<Document<Category, any, any>, any, any, any>, any, any>;
