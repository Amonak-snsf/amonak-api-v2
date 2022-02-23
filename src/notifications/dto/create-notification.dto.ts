import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationDto {

  @ApiProperty({ required: true, type: String })
  from: String

  @ApiProperty({ required: false, type: String })
  to: String

  @ApiProperty({ required: false, type: String })
  publication_id: String

  @ApiProperty({ required: true, type: String, default: true })
  content: String;

  @ApiProperty({ required: false, type: String, default: true })
  comment: String;

  @ApiProperty({ required: true, type: String, default: true })
  type: String;

  @ApiProperty({ required: true, type: Boolean, default: true })
  status: Boolean;

}
