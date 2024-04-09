import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { PubManagementType } from "./publication-managements-type.dto";

export class CreatePublicationManagementDto {

    @ApiProperty({ required: true, type: String })
    user: string;

    @ApiProperty({ required: true, type: String })
    publication: string;

    @ApiProperty({ required: false, type: Boolean, default: true })
    status: boolean;

    @ApiProperty({ required: true, type: String })
    @IsIn([PubManagementType.delete, PubManagementType.softDelete, PubManagementType.softDeleteAll,
     PubManagementType.follow, PubManagementType.like, PubManagementType.reporte, PubManagementType.save,
      PubManagementType.share, PubManagementType.sideburn, PubManagementType.signale,
       PubManagementType.buy, PubManagementType.comment, PubManagementType.alerteResponse])
    type: string;

    @ApiProperty({ required: false, type: String })
    reason: string;

    @ApiProperty({ required: false, type: String })
    to?: string;
}
