import { ApiProperty } from "@nestjs/swagger";

export class CreateFriendDto {

  @ApiProperty({ type: String })
  from: string;

  @ApiProperty({ type: String})
  to: string;
}
