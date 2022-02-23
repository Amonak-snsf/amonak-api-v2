import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty } from "class-validator";

export class CreateNewsletterDto {

    @ApiProperty({ type: String, required: true })
    @IsEmail()
    @IsNotEmpty()
    email: String;

    @ApiProperty({ type: String, required: false })
    name: String;

    @ApiProperty({ type: String, required: false })
    full_address: String;

    @ApiProperty({ type: Boolean, required: false, default: false })
    @IsIn([true, false])
    status: Boolean;
}
