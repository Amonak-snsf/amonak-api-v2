import * as mongoose from 'mongoose';
import { Friend } from 'src/friends/entities/friend.entity';
import { DefaultModel } from 'src/utils/default-model';
export declare type UserDocument = User & Document;
export declare class User extends DefaultModel {
    get fullName(): string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    dialCode: string;
    phone: string;
    gender: string;
    birthDay: string;
    birthPlace: string;
    avatar: string;
    profession: string;
    sectors: string[];
    address: Record<string, any>;
    bankCard: Record<string, any>;
    friends: Friend[];
    status: boolean;
    accountType: string;
    isLog: boolean;
    isFirstTime: boolean;
    isNewFeed: boolean;
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<User, any, any>, mongoose.Model<mongoose.Document<User, any, any>, any, any, any>, any, any>;