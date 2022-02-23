import { CreateCartDto } from "src/carts/dto/create-cart.dto";
declare const CreateCartItemDto_base: import("@nestjs/common").Type<Partial<Omit<CreateCartDto, "user_id" | "status" | "amount" | "is_waiting" | "is_completed">>>;
export declare class CreateCartItemDto extends CreateCartItemDto_base {
    cart_id: String;
    product_id: String;
    quantity: Number;
    price: Number;
}
export {};
