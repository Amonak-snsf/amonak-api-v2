import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {

  @ApiProperty({ required: true, type: Date })
  seen_at: Date;

  @ApiProperty({ required: true, type: Date })
  read_at: Date;
}
