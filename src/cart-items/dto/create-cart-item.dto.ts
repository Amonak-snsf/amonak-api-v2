/* eslint-disable prettier/prettier */
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateCartDto } from "src/carts/dto/create-cart.dto";

export class CreateCartItemDto extends PartialType(OmitType(CreateCartDto, ['amount', 'isCompleted', 'isWaiting', 'status', 'user'] as const)){

    @ApiProperty({ required: true, type: String })
    cart: string

    @ApiProperty({ required: true, type: String })
    product: string

    @ApiProperty({ required: true, type: Number, default: 1 })
    quantity: number

    @ApiProperty({ required: true, type: Number, default: 1 })
    price: number

}
