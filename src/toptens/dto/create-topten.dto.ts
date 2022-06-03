import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { File } from 'src/seller-infos/dto/files-seller-info-interface';
import { IsInt, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateToptenDto {

  @ApiProperty({ type: String })
  @IsMongoId()
  user: User;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  company: string;

  @ApiProperty({ type: []})
  files: File[];

  @ApiProperty({ type: String})
  content: String;

  @ApiProperty({ type: String})
  webSites: String;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  productNature: String[];

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  duration: string;

  @ApiProperty({})
  @IsNotEmpty()
  price: string;
}
      