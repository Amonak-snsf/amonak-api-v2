import { ApiProperty } from "@nestjs/swagger"
import { Address } from 'src/users/dto/address-interface';
import { File } from 'src/seller-infos/dto/files-seller-info-interface';

export class CreateProductDto {

    @ApiProperty({ required: true, type: String })
    name: String;

    @ApiProperty({ required: false, type: String })
    content: String;

    @ApiProperty({ required: true, type: Number })
    price: Number;

    @ApiProperty({ required: true, type: Number, default: 1 })
    quantity: Number;

    @ApiProperty({ required: false, type: Number, default: 1 })
    maxWeight: Number;

    @ApiProperty({ required: false, type: Number, default: 0 })
    purchase: Number;

    @ApiProperty({ required: false, type: String })
    currency: String;

    @ApiProperty({ type: [String]})
    files: File[];

    @ApiProperty({ type: {}})
    address: Address;

    @ApiProperty({ required: false, type: String })
    category: String;

    @ApiProperty({ required: true, type: String })
    user: String;

    @ApiProperty({ required: false, type: Boolean, default: false })
    status: Boolean;
}
