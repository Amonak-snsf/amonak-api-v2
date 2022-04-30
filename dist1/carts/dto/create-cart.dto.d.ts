import { CartStatus } from "./cart-status.dto";
export declare class CreateCartDto {
    user: String;
    amount: Number;
    tax: Number;
    shipping: Number;
    percentage: Number;
    status: CartStatus;
    isWaiting: Boolean;
    isCompleted: Boolean;
}
