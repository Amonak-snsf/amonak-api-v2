import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
export declare type SellerInfoDocument = SellerInfo & Document;
export declare class SellerInfo {
    user_id: User;
    status: Number;
    files: Record<string, any>[];
    identity_card: Record<string, any>;
    message: String;
    email: String;
    phone_number: String;
    register_number: String;
    address: Record<string, any>;
    product_nature: String[];
    type: String;
    created_at: Date;
    updated_at: Date;
}
export declare const SellerInfoSchema: mongoose.Schema<Document<SellerInfo, any, any>, mongoose.Model<Document<SellerInfo, any, any>, any, any, any>, any, any>;
