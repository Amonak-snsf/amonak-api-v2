/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
import { DefaultModel } from "src/utils/default-model";
import { ContactType } from "./newsletter-type.dto";
export declare type NewsletterDocument = Newsletter & Document;
export declare class Newsletter extends DefaultModel {
    email: String;
    name: String;
    fullAddress: String;
    subject: String;
    message: String;
    type: ContactType;
    status: Boolean;
}
export declare const NewsletterSchema: import("mongoose").Schema<Document<Newsletter, any, any>, import("mongoose").Model<Document<Newsletter, any, any>, any, any, any>, {}, {}>;
