import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { Files } from "src/users/dto/file-interface";

export class CreatePublicationDto {

    @ApiProperty({ required: false, type: String })
    content: string;

    @ApiProperty({ type: []})
    files: Files[];

    @ApiProperty({ required: false, type: String })
    user: string;

    @ApiProperty({ required: false, type: String })
    share:string

    @ApiProperty({ required: false, type: String })
    product: string;

    @ApiProperty({ required: false, type: Boolean, default: false })
    status: boolean;

    @ApiProperty({ required: true, type: String })  
    type: string;

    @ApiProperty({ required: false, type: String })
    saleContent: string;

    @ApiProperty({ required: false, type: String })
    saleType: string;

    @ApiProperty({ required: false, type: String })
    alerteType: string;

    @ApiProperty({ required: false, type: String })
    alerteName: string;

    @ApiProperty({ required: false, type: String })
    alerteDuration: string;

    @ApiProperty({ required: false, type: String })
    publicity: string;

    @ApiProperty({ required: false, type: String })
    phone: string;

    @ApiProperty({ required: false, type: String })
    shareMessage: string;
}
