import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { NotificationType } from "./notification-type.dto";

export class CreateNotificationDto {

  @ApiProperty({ required: true, type: String })
  from: string

  @ApiProperty({ required: false, type: String })
  to: string

  @ApiProperty({ required: false, type: String })
  publication: string

  @ApiProperty({ required: false, type: String })
  content: string;

  @ApiProperty({ required: false, type: String })
  comment: string;

  @ApiProperty({ required: true, type: String  })
  @IsIn([NotificationType.all, NotificationType.comment, NotificationType.friendRequest, NotificationType.like, NotificationType.publication, NotificationType.share, NotificationType.welcome])
  type: string;

  @ApiProperty({ required: true, type: Boolean, default: true })
  status: boolean;

}
