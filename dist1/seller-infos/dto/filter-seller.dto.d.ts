import { CreateSellerInfoDto } from "./create-seller-info.dto";
import { Status } from "./status-seller-info";
declare const FilterSeller_base: import("@nestjs/common").Type<Partial<Omit<CreateSellerInfoDto, "address" | "files" | "identityCard" | "message">>>;
export declare class FilterSeller extends FilterSeller_base {
    status: Status;
    limit: Number;
}
export {};
