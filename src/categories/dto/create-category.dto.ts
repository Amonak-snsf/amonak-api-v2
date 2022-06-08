import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({ type: String, required: true })
    name: String;

    @ApiProperty({ type: String, required: false })
    description:String;

    @ApiProperty({ type: String, required: false })
    image: String;

    @ApiProperty({ type: Boolean, required: false, default: false })
    @IsIn([true, false])
    status: Boolean;
}
