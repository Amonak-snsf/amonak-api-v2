import * as mongoose from 'mongoose';
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { DefaultModel } from "src/utils/default-model";
export declare type PublicationDocument = Publication & Document;
export declare class Publication extends DefaultModel {
    content: String;
    files: Record<string, any>[];
    product: Product;
    user: User;
    status: Boolean;
    type: String;
    saleType: String;
    alerteName: String;
    alerteType: String;
    alerteDuration: String;
    publicity: String;
}
export declare const PublicationSchema: mongoose.Schema<mongoose.Document<Publication, any, any>, mongoose.Model<mongoose.Document<Publication, any, any>, any, any, any>, any, any>;
