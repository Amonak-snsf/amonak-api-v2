import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCartDto } from "src/carts/dto/create-cart.dto";

export class CreateInvoiceDto  extends PartialType(CreateCartDto){

    @ApiProperty({ required: true, type: String })
    cart: string

    @ApiProperty({ required: false, type: String })
    comment: string

    @ApiProperty({ required: false, type: String })
    paymentType: string

    @ApiProperty({ required: false, type: String })
    paymentMethod: string

    @ApiProperty({ required: false, type: Date })
    paymentDate: Date

    @ApiProperty({ required: false, type: String })
    paymentReference: string
}
