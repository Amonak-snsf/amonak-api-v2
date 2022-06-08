import * as mongoose from 'mongoose';
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Files } from "src/users/dto/file-interface";
import { DefaultModel } from "src/utils/default-model";
export declare type PublicationDocument = Publication & Document;
export declare class Publication extends DefaultModel {
    content: string;
    files: Files[];
    product: Product;
    share: Publication;
    user: User;
    status: boolean;
    type: string;
    saleType: string;
    alerteName: string;
    alerteType: string;
    alerteDuration: string;
    publicity: string;
    shareMessage: string;
}
export declare const PublicationSchema: mongoose.Schema<mongoose.Document<Publication, any, any>, mongoose.Model<mongoose.Document<Publication, any, any>, any, any, any>, {}, {}>;
