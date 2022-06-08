import { CreatePublicationDto } from "./create-publication.dto";
declare const FilterPublicationDto_base: import("@nestjs/common").Type<Partial<Omit<CreatePublicationDto, "files">>>;
export declare class FilterPublicationDto extends FilterPublicationDto_base {
    limit: Number;
    search: String;
}
export {};
