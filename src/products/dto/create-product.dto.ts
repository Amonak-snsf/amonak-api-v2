import { ApiProperty } from "@nestjs/swagger"
import { Address } from 'src/users/dto/address-interface';
import { File } from 'src/seller-infos/dto/files-seller-info-interface';

export class CreateProductDto {

    @ApiProperty({ required: true, type: String })
    name: string;

    @ApiProperty({ required: false, type: String })
    content: string;

    @ApiProperty({ required: true, type: Number })
    price: number;

    @ApiProperty({ required: true, type: Number, default: 1 })
    quantity: Number;

    @ApiProperty({ required: false, type: Number, default: 1 })
    maxWeight: number;

    @ApiProperty({ required: false, type: String })
    currency: string;

    @ApiProperty({ type: [String]})
    files: File[];

    @ApiProperty({ type: {}})
    address: Address;

    @ApiProperty({ required: false, type: String })
    category: string;

    @ApiProperty({ required: true, type: String })
    user: string;

    @ApiProperty({ required: false, type: Boolean, default: false })
    status: boolean;

    @ApiProperty({ required: false, type: Number, default: false })
    buys?: number
}
