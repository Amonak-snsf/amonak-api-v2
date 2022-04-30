import { Document } from 'mongoose';
import { DefaultModel } from "src/utils/default-model";
export declare type NewsletterDocument = Newsletter & Document;
export declare class Newsletter extends DefaultModel {
    email: String;
    name: String;
    fullAddress: String;
    subject: String;
    message: String;
    type: String;
    status: Boolean;
}
export declare const NewsletterSchema: import("mongoose").Schema<Document<Newsletter, any, any>, import("mongoose").Model<Document<Newsletter, any, any>, any, any, any>, any, any>;
