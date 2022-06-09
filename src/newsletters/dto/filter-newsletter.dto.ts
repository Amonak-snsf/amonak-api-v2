import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateNewsletterDto } from "./create-newsletter.dto";

export class FilterNewsLetterDto extends PartialType(CreateNewsletterDto){

    @ApiProperty({ required: false, type: Number })
    limit: number;
}