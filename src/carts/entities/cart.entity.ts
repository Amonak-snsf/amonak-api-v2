/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { IsIn, MinLength } from 'class-validator';
import * as mongoose from 'mongoose';
import { User } from "src/users/entities/user.entity";
import { DefaultModel } from "src/utils/default-model";
import { CartStatus } from "../dto/cart-status.dto";

export type CartDocument = Cart & Document;

@Schema()
export class Cart extends DefaultModel{

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ required: false, type: Number, default: 0 })
    amount: number;

    @Prop({ required: false, type: Number, default: 0 })
    tax: number;

    @Prop({ required: false, type: Number, default: 0 })
    shipping: number;

    @Prop({ required: false, type: Number, default: 0 })
    percentage: number;

    @Prop({ required: false, type: Number, default: 0 })
    CartLength: number;

    @Prop({ required: false, type: String, default: CartStatus.unpaid })
    @IsIn([CartStatus.cancelled, CartStatus.deleted, CartStatus.failed, CartStatus.shippingCost, CartStatus.shippingRequest, CartStatus.successfull, CartStatus.unpaid, CartStatus.booking])
    status: string;

    @Prop({ required: false, type: Boolean, default: true })
    isWaiting: boolean;

    @Prop({ required: false, type: Boolean, default: false })
    isCompleted: boolean;

    @Prop([raw({
    city: { required: false, trim: true, type: String },
    area: { required: false, trim: true, type: String },
    map: { required: false, trim: true, type: String },
    phone: { required: false, trim: true, type: String }
    })])
    shippingAddress: [];

    @Prop({ required: false, type: String})
    paymentType: string;

    @Prop({ required: false, type: String})
    reference: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);