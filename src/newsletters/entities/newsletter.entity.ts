import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose';
import { DefaultModel } from "src/utils/default-model";
import { ContactType } from "./newsletter-type.dto";

export type NewsletterDocument = Newsletter & Document;

@Schema()
export class Newsletter extends DefaultModel{

    @Prop({ required: true, type: String, trim: true, lowercase: true })
    email: String;

    @Prop({ required: false, type: String, trim: true })
    name: String;

    @Prop({ required: false, type: String, trim: true })
    fullAddress: String;

    @Prop({ required: false, type: String, trim: true })
    subject: String;

    @Prop({ required: false, type: String, trim: true })
    message: String;

    @Prop({ required: true, type: String, trim: true, default: ContactType.newsletter })
    type: String;

    @Prop({ required: true, type: Boolean , default: false })
    status: Boolean;
}

export const NewsletterSchema = SchemaFactory.createForClass(Newsletter);
