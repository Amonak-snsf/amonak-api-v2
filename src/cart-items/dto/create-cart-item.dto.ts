import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateCartDto } from "src/carts/dto/create-cart.dto";

export class CreateCartItemDto extends PartialType(OmitType(CreateCartDto, ['amount', 'is_completed', 'is_waiting', 'status', 'user_id'] as const)){

    @ApiProperty({ required: true, type: String })
    cart_id: String

    @ApiProperty({ required: true, type: String })
    product_id: String

    @ApiProperty({ required: true, type: Number, default: 1 })
    quantity: Number

    @ApiProperty({ required: true, type: Number, default: 1 })
    price: Number

}
