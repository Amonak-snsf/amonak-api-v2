import { Prop, SchemaFactory } from "@nestjs/mongoose"
import { Publication } from "src/publications/entities/publication.entity"
import * as mongoose from 'mongoose';
import { User } from "src/users/entities/user.entity";
import { DefaultModel } from "src/utils/default-model";

export type PubManagementDocument = PublicationManagement & Document;

export class PublicationManagement extends DefaultModel {
    
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Publication' })
    publication: Publication

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ required: false, type: String })
    type: String

    @Prop({ required: false, type: String })
    reason: String

    @Prop({ required: false, type: Boolean, default: true })
    status: String
}

export const PubManagementSchema = SchemaFactory.createForClass(PublicationManagement);
