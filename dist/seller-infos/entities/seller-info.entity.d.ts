import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { DefaultModel } from 'src/utils/default-model';
import { Files } from 'src/users/dto/file-interface';
export declare type SellerInfoDocument = SellerInfo & Document;
export declare class SellerInfo extends DefaultModel {
    user: User;
    status: number;
    files: Files[];
    identityCard: Files[];
    message: string;
    email: string;
    phone: string;
    registerNumber: string;
    address: [];
    productNature: string[];
    type: string;
}
export declare const SellerInfoSchema: mongoose.Schema<Document<SellerInfo, any, any>, mongoose.Model<Document<SellerInfo, any, any>, any, any, any>, {}, {}, any>;
