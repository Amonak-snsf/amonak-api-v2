import * as mongoose from 'mongoose';
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
export declare type PublicationDocument = Publication & Document;
export declare class Publication {
    content: String;
    files: Record<string, any>[];
    product_id: Product;
    user_id: User;
    status: Boolean;
    type: String;
    sale_type: String;
    alerte_name: String;
    alerte_type: String;
    alerte_duration: String;
    publicity: String;
    created_at: Date;
    updated_at: Date;
}
export declare const PublicationSchema: mongoose.Schema<mongoose.Document<Publication, any, any>, mongoose.Model<mongoose.Document<Publication, any, any>, any, any, any>, any, any>;
