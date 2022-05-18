import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { DefaultModel } from 'src/utils/default-model';
export declare type ToptenDocument = Topten & Document;
export declare class Topten extends DefaultModel {
    user: User;
    followers: User[];
    files: Record<string, any>[];
    message: string;
    company: string;
    duration: number;
    webSites: string;
    name: string;
    price: string;
    status: string;
    endAt: number;
}
export declare const ToptenSchema: mongoose.Schema<Document<Topten, any, any>, mongoose.Model<Document<Topten, any, any>, any, any, any>, {}, {}>;
