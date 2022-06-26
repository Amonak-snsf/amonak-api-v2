import { ApiProperty, PartialType } from "@nestjs/swagger";
import { FilterNotification } from "src/notifications/dto/filter-notification.dto";

export class FilterMessage extends PartialType(FilterNotification){

 @ApiProperty({ required: false, type: Boolean, default: false})
 distinct: boolean;

 @ApiProperty({ required: false, type: Boolean, default: false})
 notRead: boolean
}

