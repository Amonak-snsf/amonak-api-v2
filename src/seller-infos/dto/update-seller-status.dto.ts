import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { Status } from "./status-seller-info";

export class UpdateSellerStatusDto  {

    @ApiProperty({ enum: Status})
    @IsIn([Status.seller, Status.sellerBloc, Status.sellerReject, Status.sellerRequest, Status.sellerPending])
    status: Status;
}
