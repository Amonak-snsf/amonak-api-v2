import { CreateInvoiceDto } from "./create-invoice.dto";
declare const FilterInvoice_base: import("@nestjs/common").Type<Partial<Omit<CreateInvoiceDto, "comment">>>;
export declare class FilterInvoice extends FilterInvoice_base {
    limit: number;
}
export {};
