import { CreatePublicationManagementDto } from "./create-publication-management.dto";
declare const FilterPubManagment_base: import("@nestjs/common").Type<Partial<Omit<CreatePublicationManagementDto, "reason">>>;
export declare class FilterPubManagment extends FilterPubManagment_base {
    limit: Number;
}
export {};
