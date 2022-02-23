import { Prop, SchemaFactory } from "@nestjs/mongoose"
import { Publication } from "src/publications/entities/publication.entity"
import * as mongoose from 'mongoose';
import { User } from "src/users/entities/user.entity";

export type PubManagementDocument = PublicationManagement & Document;

export class PublicationManagement {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Publication' })
    publication_id: Publication

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: User

    @Prop({ required: false, type: String })
    type: String

    @Prop({ required: false, type: String })
    reason: String

    @Prop({ required: false, type: Boolean, default: true })
    status: String

    @Prop({ required: false, default: Date.now })
    created_at: Date;

}

export const PubManagementSchema = SchemaFactory.createForClass(PublicationManagement);
