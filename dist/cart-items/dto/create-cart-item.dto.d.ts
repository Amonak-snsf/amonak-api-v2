import { CreateCartDto } from "src/carts/dto/create-cart.dto";
declare const CreateCartItemDto_base: import("@nestjs/common").Type<Partial<Omit<CreateCartDto, "status" | "user" | "amount" | "isWaiting" | "isCompleted">>>;
export declare class CreateCartItemDto extends CreateCartItemDto_base {
    cart: String;
    product: String;
    quantity: Number;
    price: Number;
}
export {};
