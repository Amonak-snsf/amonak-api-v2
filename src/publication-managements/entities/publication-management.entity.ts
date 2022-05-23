/* eslint-disable prettier/prettier */
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import { Publication } from "src/publications/entities/publication.entity"
import * as mongoose from 'mongoose';
import { User } from "src/users/entities/user.entity";
import { DefaultModel } from "src/utils/default-model";

export type PubManagementDocument = PublicationManagement & Document;

@Schema()
export class PublicationManagement extends DefaultModel {
    
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Publication' })
    publication: Publication

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ required: false, type: String })
    type: string

    @Prop({ required: false, type: String })
    reason: string

    @Prop({ required: false, type: Boolean, default: true })
    status: boolean
}

export const PubManagementSchema = SchemaFactory.createForClass(PublicationManagement);
