import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCartDto } from "src/carts/dto/create-cart.dto";

export class CreateInvoiceDto  extends PartialType(CreateCartDto){

    @ApiProperty({ required: true, type: String })
    cart: String

    @ApiProperty({ required: false, type: String })
    comment: String

    @ApiProperty({ required: false, type: String })
    paymentType: String

    @ApiProperty({ required: false, type: String })
    paymentMethod: String

    @ApiProperty({ required: false, type: Date })
    paymentDate: Date

    @ApiProperty({ required: false, type: String })
    paymentReference: String
}
