import { CreateCartDto } from "./create-cart.dto";
declare const FilterCart_base: import("@nestjs/common").Type<Partial<Omit<CreateCartDto, never>>>;
export declare class FilterCart extends FilterCart_base {
    limit: Number;
}
export {};
