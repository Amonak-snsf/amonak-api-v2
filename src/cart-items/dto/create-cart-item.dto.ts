import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateCartDto } from "src/carts/dto/create-cart.dto";

export class CreateCartItemDto extends PartialType(OmitType(CreateCartDto, ['amount', 'isCompleted', 'isWaiting', 'status', 'user'] as const)){

    @ApiProperty({ required: true, type: String })
    cart: String

    @ApiProperty({ required: true, type: String })
    product: String

    @ApiProperty({ required: true, type: Number, default: 1 })
    quantity: Number

    @ApiProperty({ required: true, type: Number, default: 1 })
    price: Number

}
