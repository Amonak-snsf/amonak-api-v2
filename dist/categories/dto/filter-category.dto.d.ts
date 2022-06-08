import { CreateCategoryDto } from "./create-category.dto";
declare const FilterCategoryDto_base: import("@nestjs/common").Type<Partial<CreateCategoryDto>>;
export declare class FilterCategoryDto extends FilterCategoryDto_base {
    limit: Number;
}
export {};
