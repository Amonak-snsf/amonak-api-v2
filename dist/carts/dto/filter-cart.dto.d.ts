import { CreateCartDto } from "./create-cart.dto";
import { CartStatus } from "./cart-status.dto";
declare const FilterCart_base: import("@nestjs/common").Type<Partial<Omit<CreateCartDto, never>>>;
export declare class FilterCart extends FilterCart_base {
    limit: number;
    user: string;
    status: CartStatus;
}
export {};
