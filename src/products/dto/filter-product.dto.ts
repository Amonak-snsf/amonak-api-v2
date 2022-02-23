import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";

export class FilterProductDto extends PartialType(OmitType(CreateProductDto, ['address', 'files'] as const)){

    @ApiProperty({ required: false, type: Number })
    limit: Number;

    @ApiProperty({ type: String, required: false})
    search: String;
}