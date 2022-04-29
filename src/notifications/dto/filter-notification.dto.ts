import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateNotificationDto } from "./create-notification.dto";

export class FilterNotification extends PartialType(OmitType(CreateNotificationDto, ['comment', 'publication'] as const)){

    @ApiProperty({ type: Number, required: false })
    limit: Number;
}