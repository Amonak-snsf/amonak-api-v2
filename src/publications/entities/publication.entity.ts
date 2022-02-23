import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsIn } from "class-validator";
import * as mongoose from 'mongoose';
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { AlerteType, PublicationType, SaleType } from "../dto/publication-type.dto";

export type PublicationDocument = Publication & Document;

@Schema()
export class Publication {

    @Prop({ required: false, type: String, trim: true })
    content: String;

    @Prop(raw({
        url: { required: false, trim: true, type: String, select: true },
        type: { required: false, trim: true, type: String, select: true }
    }))
    files: Record<string, any>[];
      
    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product_id: Product

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: User

    @Prop({ required: true, type: Boolean, default: true })
    status: Boolean

    @Prop({ required: true, type: String, trim: true, default: PublicationType.default })
    @IsIn([PublicationType.alerte, PublicationType.default, PublicationType.post, PublicationType.publicity, PublicationType.sale, PublicationType.share])
    type: String;

    @Prop({ required: false, type: String, trim: true })
    @IsIn([SaleType.default])
    sale_type: String;

    @Prop({ required: false, type: String, trim: true })
    alerte_name: String;

    @Prop({ required: false, type: String, trim: true })
    @IsIn([AlerteType.default])
    alerte_type: String;

    @Prop({ required: false, type: String, trim: true })
    alerte_duration: String;

    @Prop({ required: false, type: String, trim: true })
    publicity: String;

    @Prop({ required: false, default: Date.now })
    created_at: Date;

    @Prop({ required: false, default: Date.now })
    updated_at: Date;
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);

