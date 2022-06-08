import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateInvoiceDto } from "./create-invoice.dto";

export class FilterInvoice extends PartialType(OmitType(CreateInvoiceDto, ['comment'] as const )){

    @ApiProperty({ required: false, type: Number})
    limit: Number
}