import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { DefaultModel } from 'src/utils/default-model';
export declare type SellerInfoDocument = SellerInfo & Document;
export declare class SellerInfo extends DefaultModel {
    user: User;
    status: number;
    files: Record<string, any>[];
    identityCard: Record<string, any>[];
    message: string;
    email: string;
    phone: string;
    registerNumber: string;
    address: Record<string, any>;
    productNature: string[];
    type: string;
}
export declare const SellerInfoSchema: mongoose.Schema<Document<SellerInfo, any, any>, mongoose.Model<Document<SellerInfo, any, any>, any, any, any>, {}, {}>;
