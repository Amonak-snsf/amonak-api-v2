import { Document } from 'mongoose';
export declare type NewsletterDocument = Newsletter & Document;
export declare class Newsletter {
    email: String;
    name: String;
    full_address: String;
    status: Boolean;
    created_at: Date;
    updated_at: Date;
}
export declare const NewsletterSchema: import("mongoose").Schema<Document<Newsletter, any, any>, import("mongoose").Model<Document<Newsletter, any, any>, any, any, any>, any, any>;
