import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Address } from 'src/users/dto/address-interface';
import { File } from './files-seller-info-interface';

export class CreateSellerInfoDto {

  @ApiProperty({default: 'aikpeachille55@gmail.com'})
  @IsEmail()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ type: [String]})
  files: File[];

  @ApiProperty({ type: {}})
  identityCard: File;

  @ApiProperty({ type: {}})
  address: Address;

  @ApiProperty({ type: [String] })
  productNature: String[];

  @ApiProperty({ type: String})
  type: String;

  @ApiProperty()
  message: string;
}
   