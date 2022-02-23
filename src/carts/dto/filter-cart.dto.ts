import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateCartDto } from "./create-cart.dto";

export class FilterCart extends PartialType(OmitType(CreateCartDto, [] as const)){

    @ApiProperty({ required: false, type: Number})
    limit: Number
}