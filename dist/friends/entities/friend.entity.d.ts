import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
export declare type FriendDocument = Friend & Document;
export declare class Friend {
    from: User;
    to: User;
    status: Number;
    created_at: Date;
    updated_at: Date;
}
export declare const FriendSchema: mongoose.Schema<Document<Friend, any, any>, mongoose.Model<Document<Friend, any, any>, any, any, any>, any, any>;
