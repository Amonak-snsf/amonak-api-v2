import * as mongoose from 'mongoose';
import { User } from "src/users/entities/user.entity";
import { DefaultModel } from "src/utils/default-model";
export declare type CartDocument = Cart & Document;
export declare class Cart extends DefaultModel {
    user: User;
    amount: Number;
    tax: Number;
    shipping: Number;
    percentage: Number;
    status: String;
    isWaiting: Boolean;
    isCompleted: Boolean;
}
export declare const CartSchema: mongoose.Schema<mongoose.Document<Cart, any, any>, mongoose.Model<mongoose.Document<Cart, any, any>, any, any, any>, any, any>;
