import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsIn } from "class-validator";
import * as mongoose from 'mongoose';
import { User } from "src/users/entities/user.entity";
import { CartStatus } from "../dto/cart-status.dto";

export type CartDocument = Cart & Document;

@Schema()
export class Cart {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: User

    @Prop({ required: false, type: Number, default: 0 })
    amount: Number;

    @Prop({ required: false, type: Number, default: 0 })
    tax: Number;

    @Prop({ required: false, type: Number, default: 0 })
    shipping: Number;

    @Prop({ required: false, type: Number, default: 0 })
    percentage: Number;

    @Prop({ required: false, type: String, default: CartStatus.unpaid })
    @IsIn([CartStatus.cancelled, CartStatus.deleted, CartStatus.failed, CartStatus.shipping_cost, CartStatus.shipping_request, CartStatus.successfull, CartStatus.unpaid, CartStatus.booking])
    status: String;

    @Prop({ required: false, type: Boolean, default: true })
    is_waiting: Boolean;

    @Prop({ required: false, type: Boolean, default: false })
    is_completed: Boolean;

    @Prop({ required: true, type: Date, default: Date.now })
    created_at: Date

    @Prop({ required: true, type: Date, default: Date.now })
    updated_at: Date

}

export const CartSchema = SchemaFactory.createForClass(Cart);