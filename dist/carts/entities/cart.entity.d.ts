import * as mongoose from 'mongoose';
import { User } from "src/users/entities/user.entity";
export declare type CartDocument = Cart & Document;
export declare class Cart {
    user_id: User;
    amount: Number;
    tax: Number;
    shipping: Number;
    percentage: Number;
    status: String;
    is_waiting: Boolean;
    is_completed: Boolean;
    created_at: Date;
    updated_at: Date;
}
export declare const CartSchema: mongoose.Schema<mongoose.Document<Cart, any, any>, mongoose.Model<mongoose.Document<Cart, any, any>, any, any, any>, any, any>;
