import { ApiProperty, PartialType } from "@nestjs/swagger";
import { FilterNotification } from "src/notifications/dto/filter-notification.dto";

export class FilterMessage extends PartialType(FilterNotification){

 @ApiProperty({ required: false, type: Boolean})
 distinct: false
}