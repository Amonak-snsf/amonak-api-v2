import { CreateCartDto } from "src/carts/dto/create-cart.dto";
declare const CreateCartItemDto_base: import("@nestjs/common").Type<Partial<Omit<CreateCartDto, "user" | "amount" | "isCompleted" | "isWaiting" | "status">>>;
export declare class CreateCartItemDto extends CreateCartItemDto_base {
    cart: string;
    product: string;
    quantity: number;
    price: number;
    user?: string;
}
export {};
