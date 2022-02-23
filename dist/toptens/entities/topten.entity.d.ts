import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
export declare type ToptenDocument = Topten & Document;
export declare class Topten {
    user_id: User;
    followers: User[];
    files: Record<string, any>[];
    message: String;
    company: String;
    duration: Number;
    website: String;
    name: String;
    price: String;
    status: String;
    end_at: Number;
    created_at: Date;
    updated_at: Date;
}
export declare const ToptenSchema: mongoose.Schema<Document<Topten, any, any>, mongoose.Model<Document<Topten, any, any>, any, any, any>, any, any>;
