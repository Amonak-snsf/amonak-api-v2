import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type CatDocument = Cat & Document;
export declare class Cat {
    token: string;
    createdAt: Date;
}
export declare const CatSchema: mongoose.Schema<Document<Cat, any, any>, mongoose.Model<Document<Cat, any, any>, any, any, any>, any, any>;
