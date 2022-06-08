import * as mongoose from 'mongoose';
import { User } from "src/users/entities/user.entity";
import { DefaultModel } from "src/utils/default-model";
export declare type CartDocument = Cart & Document;
export declare class Cart extends DefaultModel {
    user: User;
    amount: number;
    tax: number;
    shipping: number;
    percentage: number;
    status: string;
    isWaiting: boolean;
    isCompleted: boolean;
}
export declare const CartSchema: mongoose.Schema<mongoose.Document<Cart, any, any>, mongoose.Model<mongoose.Document<Cart, any, any>, any, any, any>, {}, {}>;
