import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreatePublicationManagementDto } from "./create-publication-management.dto";

export class FilterPubManagment extends PartialType(OmitType(CreatePublicationManagementDto, ['reason'] as const)){

    @ApiProperty({ type: Number, required: false })
    limit: number
}