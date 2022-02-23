import { ApiProperty } from "@nestjs/swagger"
import { CartStatus } from "./cart-status.dto";

export class CreateCartDto {

    @ApiProperty({ required: true, type: String })
    user_id: String
    
    @ApiProperty({ required: true, type: Number, default: 1 })
    amount: Number;

    @ApiProperty({ required: false, type: Number, default: 0 })
    tax: Number;

    @ApiProperty({ required: false, type: Number, default: 0 })
    shipping: Number;

    @ApiProperty({ required: false, type: Number, default: 0 })
    percentage: Number;

    @ApiProperty({ required: false, type: String, default: CartStatus.unpaid })
    status: CartStatus;

    @ApiProperty({ required: false, type: Boolean, default: true })
    is_waiting: Boolean;

    @ApiProperty({ required: false, type: Boolean, default: false })
    is_completed: Boolean;
}
