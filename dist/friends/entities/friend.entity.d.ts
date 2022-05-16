import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { DefaultModel } from 'src/utils/default-model';
export declare type FriendDocument = Friend & Document;
export declare class Friend extends DefaultModel {
    from: User;
    to: User;
    status: Number;
}
export declare const FriendSchema: mongoose.Schema<Document<Friend, any, any>, mongoose.Model<Document<Friend, any, any>, any, any, any>, {}, {}>;
