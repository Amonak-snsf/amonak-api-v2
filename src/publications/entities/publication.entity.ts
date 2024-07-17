/* eslint-disable prettier/prettier */
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsIn } from "class-validator";
import * as mongoose from 'mongoose';
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Files } from "src/users/dto/file-interface";
import { DefaultModel } from "src/utils/default-model";
import { AlerteType, PublicationType, SaleType } from "../dto/publication-type.dto";

export type PublicationDocument = Publication & Document;

@Schema()
export class Publication extends DefaultModel{

    @Prop({ required: false, type: String, trim: true })
    content: string;

    @Prop([
        raw({
        destination: { required: false, trim: true, type: String, select: true },
        type: { required: false, trim: true, type: String, select: true },
        extension: { required: false, trim: true, type: String, select: true },
        originalname: { required: false, trim: true, type: String, select: true },
        filename: { required: false, trim: true, type: String, select: true },
        size: { required: false, trim: true, type: Number, select: true},
        url: { required: false, trim: true, type: String, select: true },
        }
       ) 
    ])
    files: Files[];

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product: Product

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Publication' })
    share: Publication

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ required: true, type: Boolean, default: true })
    status: boolean

    @Prop({ required: true, type: String, trim: true, default: PublicationType.default })
    @IsIn([PublicationType.alerte, PublicationType.default, PublicationType.post, PublicationType.publicity, PublicationType.sale, PublicationType.share])
    type: string;

    @Prop({ required: false, type: String, trim: true })
    @IsIn([SaleType.default])
    saleType: string;

    @Prop({ required: false, type: String, trim: true })
    alerteName: string;

    @Prop({ required: false, type: String, trim: true })
    @IsIn([AlerteType.default])
    alerteType: string;

    @Prop({ required: false, type: String, trim: true })
    alerteDuration: string;

    @Prop({ required: false, type: String, trim: true })
    publicity: string;

    @Prop({ required: false, type: String, trim: true })
    shareMessage: string;

    @Prop({ required: false, type: String, trim: true })
    videoPath: string;

    @Prop({ required: false, type: String, trim: true })
    thumbnailPath: string;
    //@Prop({ required: false, type: [String], trim: true })
   // publicationIdArray: string[];

    
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);

