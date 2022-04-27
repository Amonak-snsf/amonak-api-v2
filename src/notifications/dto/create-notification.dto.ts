import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { NotificationType } from "./notification-type.dto";

export class CreateNotificationDto {

  @ApiProperty({ required: true, type: String })
  from: String

  @ApiProperty({ required: false, type: String })
  to: String

  @ApiProperty({ required: false, type: String })
  publication_id: String

  @ApiProperty({ required: false, type: String })
  content: String;

  @ApiProperty({ required: false, type: String })
  comment: String;

  @ApiProperty({ required: true, type: String  })
  @IsIn([NotificationType.all, NotificationType.comment, NotificationType.friend_request, NotificationType.like, NotificationType.publication, NotificationType.share, NotificationType.welcome])
  type: String;

  @ApiProperty({ required: true, type: Boolean, default: true })
  status: Boolean;

}
