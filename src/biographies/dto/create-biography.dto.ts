import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateBiographyDto {

  @ApiProperty()
  relationship: string;

  @ApiProperty({type: [String]})
  family_member: User[];

  @ApiProperty({type: [String]})
  nickname: string[];

  @ApiProperty({type: [String]})
  interested_by: string[];

  @ApiProperty({type: [String]})
  politics: string[];

  @ApiProperty({type: [String]})
  confessions: string[];

  @ApiProperty({type: [String]})
  languages: string[];

  @ApiProperty({ type: Date })
  web_sites: string[];

  @ApiProperty({ type: [String] })
  networks: String;

  @ApiProperty({ enum: [true,false]})
  @IsIn([true, false])
  status: string;
}
