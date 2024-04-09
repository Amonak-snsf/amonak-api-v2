import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty } from "class-validator";
import { ContactType } from "../entities/newsletter-type.dto";

export class CreateNewsletterDto {

    @ApiProperty({ type: String, required: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ type: String, required: false })
    name: string;

    @ApiProperty({ type: String, required: false })
    fullAddress: string;

    @ApiProperty({ required: false, type: String })
    subject: string;

    @ApiProperty({ required: false, type: String })
    message: string;

    @ApiProperty({ required: true, type: String, default: ContactType.newsletter })
    type: string;

    @ApiProperty({ type: Boolean, required: false, default: false })
    @IsIn([true, false])
    status: boolean;
}
