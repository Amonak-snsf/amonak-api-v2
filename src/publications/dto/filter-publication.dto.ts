import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreatePublicationDto } from "./create-publication.dto";

export class FilterPublicationDto extends PartialType(OmitType(CreatePublicationDto, ['files'])){

    @ApiProperty({ type: Number, required: false })
    limit: number

    @ApiProperty({ type: String, required: false})
    search: string;
}