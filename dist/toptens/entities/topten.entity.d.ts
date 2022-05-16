import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { DefaultModel } from 'src/utils/default-model';
export declare type ToptenDocument = Topten & Document;
export declare class Topten extends DefaultModel {
    user: User;
    followers: User[];
    files: Record<string, any>[];
    message: String;
    company: String;
    duration: Number;
    webSites: String;
    name: String;
    price: String;
    status: String;
    endAt: Number;
}
export declare const ToptenSchema: mongoose.Schema<Document<Topten, any, any>, mongoose.Model<Document<Topten, any, any>, any, any, any>, {}, {}>;
