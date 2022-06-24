/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indizes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
import { Document } from 'mongoose';
import { DefaultModel } from "src/utils/default-model";
import { ContactType } from "./newsletter-type.dto";
export declare type NewsletterDocument = Newsletter & Document;
export declare class Newsletter extends DefaultModel {
    email: string;
    name: string;
    fullAddress: string;
    subject: string;
    message: string;
    type: ContactType;
    status: boolean;
}
export declare const NewsletterSchema: import("mongoose").Schema<Document<Newsletter, any, any>, import("mongoose").Model<Document<Newsletter, any, any>, any, any, any>, {}, {}, any>;
