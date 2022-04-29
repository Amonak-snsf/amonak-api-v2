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
    amount: Number;

    @Prop({ required: false, type: Number, default: 0 })
    tax: Number;

    @Prop({ required: false, type: Number, default: 0 })
    shipping: Number;

    @Prop({ required: false, type: Number, default: 0 })
    percentage: Number;

    @Prop({ required: false, type: String, default: CartStatus.unpaid })
    @IsIn([CartStatus.cancelled, CartStatus.deleted, CartStatus.failed, CartStatus.shippingCost, CartStatus.shippingRequest, CartStatus.successfull, CartStatus.unpaid, CartStatus.booking])
    status: String;

    @Prop({ required: false, type: Boolean, default: true })
    isWaiting: Boolean;

    @Prop({ required: false, type: Boolean, default: false })
    isCompleted: Boolean;
}

export const CartSchema = SchemaFactory.createForClass(Cart);