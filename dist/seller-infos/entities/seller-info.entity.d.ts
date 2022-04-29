import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { DefaultModel } from 'src/utils/default-model';
export declare type SellerInfoDocument = SellerInfo & Document;
export declare class SellerInfo extends DefaultModel {
    user: User;
    status: Number;
    files: Record<string, any>[];
    identityCard: Record<string, any>;
    message: String;
    email: String;
    phone: String;
    registerNumber: String;
    address: Record<string, any>;
    productNature: String[];
    type: String;
}
export declare const SellerInfoSchema: mongoose.Schema<Document<SellerInfo, any, any>, mongoose.Model<Document<SellerInfo, any, any>, any, any, any>, any, any>;
