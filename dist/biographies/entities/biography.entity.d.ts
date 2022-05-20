import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { User } from "src/users/entities/user.entity";
import { DefaultModel } from "src/utils/default-model";
export declare type BiographyDocument = Biography & Document;
export declare class Biography extends DefaultModel {
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
}
export declare const BiographySchema: mongoose.Schema<Document<Biography, any, any>, mongoose.Model<Document<Biography, any, any>, any, any, any>, {}, {}>;
