import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateBiographyDto {
  @ApiProperty()
  relationShip: string;

  @ApiProperty({ type: [String] })
  familyMember: User[];

  @ApiProperty({ type: [String] })
  nickname: string[];

  @ApiProperty({ type: [String] })
  interestedBy: string[];

  @ApiProperty({ type: [String] })
  politics: string[];

  @ApiProperty({ type: [String] })
  confessions: string[];

  @ApiProperty({ type: [String] })
  languages: string[];

  @ApiProperty({ type: Date })
  webSites: string[];

  @ApiProperty({ type: [String] })
  networks: string;

  @ApiProperty({ enum: [true, false] })
  @IsIn([true, false])
  status: string;
}
