import { CartStatus } from "./cart-status.dto";
export declare class CreateCartDto {
    user: string;
    amount: number;
    tax: number;
    shipping: number;
    percentage: number;
    status: CartStatus;
    isWaiting: boolean;
    isCompleted: boolean;
}
