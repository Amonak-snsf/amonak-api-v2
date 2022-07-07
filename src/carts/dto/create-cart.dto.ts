import { ApiProperty } from "@nestjs/swagger"
import { CartStatus } from "./cart-status.dto";

export class CreateCartDto {

    @ApiProperty({ required: true, type: String })
    user: string
    
    @ApiProperty({ required: false, type: Number, default: 1 })
    amount: number;

    @ApiProperty({ required: false, type: Number, default: 0 })
    tax: number;

    @ApiProperty({ required: false, type: Number, default: 0 })
    shipping: number;

    @ApiProperty({ required: false, type: Number, default: 0 })
    percentage: number;

    @ApiProperty({ required: false, type: Number, default: 0 })
    CartLength: number;

    @ApiProperty({ required: true, type: String, default: CartStatus.unpaid })
    status: CartStatus;

    @ApiProperty({ required: false, type: Boolean, default: true })
    isWaiting: boolean;

    @ApiProperty({ required: false, type: Boolean, default: false })
    isCompleted: boolean;

    @ApiProperty({ type: []})
    shippingAddress: [];

    @ApiProperty({ required: false, type: String })
    paymentType: string;

    @ApiProperty({ required: false, type: String })
    reference: string;

    @ApiProperty({ required: false, type: Date })
    updatedAt: Date;
} 