import { CreateProductDto } from "./create-product.dto";
declare const FilterProductDto_base: import("@nestjs/common").Type<Partial<Omit<CreateProductDto, "files" | "address">>>;
export declare class FilterProductDto extends FilterProductDto_base {
    limit: Number;
    search: String;
}
export {};
