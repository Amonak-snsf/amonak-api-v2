import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { CreateSellerInfoDto } from "./create-seller-info.dto";
import { Status } from "./status-seller-info";

export class FilterSeller extends PartialType(OmitType(CreateSellerInfoDto, ['identityCard', 'files', 'address', 'message'] as const)){
    
    @ApiProperty({ enum: Status})
    @IsIn([Status.read, Status.accepted, Status.refused, Status.cancelled, Status.created])
    status: Status;

    @ApiProperty({ type: Number, required: false })
    limit: Number;
}