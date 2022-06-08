import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty } from "class-validator";
import { ContactType } from "../entities/newsletter-type.dto";

export class CreateNewsletterDto {

    @ApiProperty({ type: String, required: true })
    @IsEmail()
    @IsNotEmpty()
    email: String;

    @ApiProperty({ type: String, required: false })
    name: String;

    @ApiProperty({ type: String, required: false })
    fullAddress: String;

    @ApiProperty({ required: false, type: String })
    subject: String;

    @ApiProperty({ required: false, type: String })
    message: String;

    @ApiProperty({ required: true, type: String, default: ContactType.newsletter })
    type: String;

    @ApiProperty({ type: Boolean, required: false, default: false })
    @IsIn([true, false])
    status: Boolean;
}
