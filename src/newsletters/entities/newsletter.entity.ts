import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose';
import { DefaultModel } from "src/utils/default-model";
import { ContactType } from "./newsletter-type.dto";

export type NewsletterDocument = Newsletter & Document;

@Schema()
export class Newsletter extends DefaultModel{

    @Prop({ required: true, type: String, trim: true, lowercase: true })
    email: string;

    @Prop({ required: false, type: String, trim: true })
    name: string;

    @Prop({ required: false, type: String, trim: true })
    fullAddress: string;

    @Prop({ required: false, type: String, trim: true })
    subject: string;

    @Prop({ required: false, type: String, trim: true })
    message: string;

    @Prop({ required: true, type: String, trim: true, default: ContactType.newsletter })
    type: ContactType;

    @Prop({ required: true, type: Boolean , default: false })
    status: boolean;
}

export const NewsletterSchema = SchemaFactory.createForClass(Newsletter);
