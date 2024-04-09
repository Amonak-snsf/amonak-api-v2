import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { CreateSellerInfoDto } from "./create-seller-info.dto";
import { Status } from "./status-seller-info";

export class FilterSeller extends PartialType(OmitType(CreateSellerInfoDto, ['identityCard', 'files', 'address', 'message'] as const)){
    
    @ApiProperty({ enum: Status})
    @IsIn([Status.seller, Status.sellerBloc, Status.sellerReject, Status.sellerRequest, Status.sellerPending])
    status: Status;

    @ApiProperty({ type: Number, required: false })
    limit: number;
}