import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { Files } from "src/users/dto/file-interface";

export class CreatePublicationDto {

    @ApiProperty({ required: false, type: String })
    content: String;

    @ApiProperty({ type: []})
    files: Files[];

    @ApiProperty({ required: false, type: String })
    user: String;

    @ApiProperty({ required: false, type: String })
    product: String;

    @ApiProperty({ required: false, type: Boolean, default: false })
    status: Boolean;

    @ApiProperty({ required: true, type: String })  
    type: String;

    @ApiProperty({ required: false, type: String })
    saleContent: String;

    @ApiProperty({ required: false, type: String })
    saleType: String;

    @ApiProperty({ required: false, type: String })
    alerteType: String;

    @ApiProperty({ required: false, type: String })
    alerteName: String;

    @ApiProperty({ required: false, type: String })
    alerteDuration: String;

    @ApiProperty({ required: false, type: String })
    publicity: String;

    @ApiProperty({ required: false, type: String })
    phone: String;
}
