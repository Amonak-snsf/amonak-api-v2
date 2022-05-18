/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsIn } from "class-validator";
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

    @Prop({ required: false, type: String, default: CartStatus.unpaid })
    @IsIn([CartStatus.cancelled, CartStatus.deleted, CartStatus.failed, CartStatus.shippingCost, CartStatus.shippingRequest, CartStatus.successfull, CartStatus.unpaid, CartStatus.booking])
    status: string;

    @Prop({ required: false, type: Boolean, default: true })
    isWaiting: boolean;

    @Prop({ required: false, type: Boolean, default: false })
    isCompleted: boolean;
}

export const CartSchema = SchemaFactory.createForClass(Cart);