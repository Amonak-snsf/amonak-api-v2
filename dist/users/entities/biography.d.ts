import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.entity';
export declare type BiographyDocument = Biography & Document;
export declare class Biography {
    user_id: User;
    relationship: string;
    family_member: User[];
    nickname: string[];
    interested_by: string[];
    politics: string[];
    confessions: string[];
    languages: string[];
    web_sites: string[];
    networks: string[];
    status: string;
    created_at: Date;
    updated_at: Date;
}
export declare const BiographySchema: mongoose.Schema<Document<Biography, any, any>, mongoose.Model<Document<Biography, any, any>, any, any, any>, any, any>;
