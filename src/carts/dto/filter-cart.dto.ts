import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateCartDto } from "./create-cart.dto";
import { CartStatus } from "./cart-status.dto";

export class FilterCart extends PartialType(OmitType(CreateCartDto, [] as const)){

    @ApiProperty({ required: false, type: Number})
    limit: number;

    @ApiProperty({ required: false, type: String})
    user: string

    @ApiProperty({ required: false, type: String, default: CartStatus.unpaid })
    status: CartStatus;
}