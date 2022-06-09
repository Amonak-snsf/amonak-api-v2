import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({ type: String, required: true })
    name: string;

    @ApiProperty({ type: String, required: false })
    description: string;

    @ApiProperty({ type: String, required: false })
    image: string;

    @ApiProperty({ type: Boolean, required: false, default: false })
    @IsIn([true, false])
    status: boolean;
}
