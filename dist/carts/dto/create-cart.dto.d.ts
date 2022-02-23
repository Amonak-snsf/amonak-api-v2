import { CartStatus } from "./cart-status.dto";
export declare class CreateCartDto {
    user_id: String;
    amount: Number;
    tax: Number;
    shipping: Number;
    percentage: Number;
    status: CartStatus;
    is_waiting: Boolean;
    is_completed: Boolean;
}
