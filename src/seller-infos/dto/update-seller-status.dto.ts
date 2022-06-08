import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { Status } from "./status-seller-info";

export class UpdateSellerStatusDto  {

    @ApiProperty({ enum: Status})
    @IsIn([Status.read, Status.accepted, Status.refused, Status.cancelled, Status.created])
    status: Status;
}
