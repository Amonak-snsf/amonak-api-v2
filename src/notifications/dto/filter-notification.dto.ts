import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateNotificationDto } from "./create-notification.dto";

export class FilterNotification extends PartialType(OmitType(CreateNotificationDto, ['comment', 'publication'] as const)){

    @ApiProperty({ type: Number, required: false })
    limit: Number;

    @ApiProperty({ required: false, type: Boolean, default: true })
  	status: boolean;

  	@ApiProperty({ required: false })
  	seenAt: Date;

  	@ApiProperty({ required: false })
  	readAt: Date;

  	@ApiProperty({ required: false, type: String })
  	to: string;

  	@ApiProperty({ required: false, type: String })
  	type: string;
}
