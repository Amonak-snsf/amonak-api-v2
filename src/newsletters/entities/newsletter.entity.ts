import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose';

export type NewsletterDocument = Newsletter & Document;

@Schema()
export class Newsletter {

    @Prop({ required: true, type: String, trim: true, lowercase: true, unique: true })
    email: String;

    @Prop({ required: false, type: String, trim: true })
    name: String;

    @Prop({ required: false, type: String, trim: true })
    full_address: String;

    @Prop({ required: true, type: Boolean , default: false })
    status: Boolean;

    @Prop({ required: false, type: Date, default: Date.now })
    created_at: Date;

    @Prop({ required: false, type: Date, default: Date.now })
    updated_at: Date;
}

export const NewsletterSchema = SchemaFactory.createForClass(Newsletter);
