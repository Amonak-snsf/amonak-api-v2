import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Address } from 'src/users/dto/address-interface';
import { File } from './files-seller-info-interface';

export class CreateSellerInfoDto {

  @ApiProperty({default: 'aikpeachille55@gmail.com'})
  @IsEmail()
  email: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty({ type: [String]})
  files: File[];

  @ApiProperty({ type: {}})
  identity_card: File;

  @ApiProperty({ type: {}})
  address: Address;

  @ApiProperty({ type: [String] })
  product_nature: String[];

  @ApiProperty({ type: String})
  type: String;

  @ApiProperty()
  message: string;
}
   