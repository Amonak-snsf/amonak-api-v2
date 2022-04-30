import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.entity';
export declare type BiographyDocument = Biography & Document;
export declare class Biography {
    user: User;
    relationShip: string;
    familyMember: User[];
    nickname: string[];
    interestedBy: string[];
    politics: string[];
    confessions: string[];
    languages: string[];
    webSites: string[];
    networks: string[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const BiographySchema: mongoose.Schema<Document<Biography, any, any>, mongoose.Model<Document<Biography, any, any>, any, any, any>, any, any>;
