import { ApiProperty } from "@nestjs/swagger";

export class CreateFriendDto {

  @ApiProperty({ type: String })
  from: String;

  @ApiProperty({ type: String})
  to: String;
}
