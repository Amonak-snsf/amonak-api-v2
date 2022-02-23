import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCartDto } from "src/carts/dto/create-cart.dto";

export class CreateInvoiceDto  extends PartialType(CreateCartDto){

    @ApiProperty({ required: true, type: String })
    cart_id: String

    @ApiProperty({ required: false, type: String })
    comment: String

    @ApiProperty({ required: false, type: String })
    payment_type: String

    @ApiProperty({ required: false, type: String })
    payment_method: String

    @ApiProperty({ required: false, type: Date })
    payment_date: Date

    @ApiProperty({ required: false, type: String })
    payment_reference: String
}
