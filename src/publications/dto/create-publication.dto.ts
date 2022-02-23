import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

export class CreatePublicationDto {

    @ApiProperty({ required: false, type: String })
    content: String;

    @ApiProperty({ type: [String]})
    files: File[];

    @ApiProperty({ required: false, type: String })
    user_id: String;

    @ApiProperty({ required: false, type: String })
    product_id: String;

    @ApiProperty({ required: false, type: Boolean, default: false })
    status: Boolean;

    @ApiProperty({ required: true, type: String })  
    type: String;

    @ApiProperty({ required: false, type: String })
    sale_content: String;

    @ApiProperty({ required: false, type: String })
    sale_type: String;

    @ApiProperty({ required: false, type: String })
    alerte_type: String;

    @ApiProperty({ required: false, type: String })
    alerte_name: String;

    @ApiProperty({ required: false, type: String })
    alerte_duration: String;

    @ApiProperty({ required: false, type: String })
    publicity: String;
}
