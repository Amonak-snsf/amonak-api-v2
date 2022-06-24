import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.entity';
export declare type TokenDocument = Token & Document;
export declare class Token {
    user: User;
    token: string;
    createdAt: Date;
}
export declare const TokenSchema: mongoose.Schema<Document<Token, any, any>, mongoose.Model<Document<Token, any, any>, any, any, any>, {}, {}, any>;
