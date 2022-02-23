import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { File } from 'src/seller-infos/dto/files-seller-info-interface';
import { IsInt, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateToptenDto {

  @ApiProperty({ type: String })
  @IsMongoId()
  user_id: User;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  company: string;

  @ApiProperty({ type: [String]})
  files: File[];

  @ApiProperty({ type: String})
  message: String;

  @ApiProperty({ type: String})
  website: String;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  product_nature: String[];

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  duration: string;

  @ApiProperty({})
  @IsNotEmpty()
  price: string;

}
      