import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsMongoId, IsNotEmpty, MinLength } from 'class-validator';
import { Friend } from 'src/friends/entities/friend.entity';
import { User } from 'src/users/entities/user.entity';
import { Address } from './address-interface';
import { BankCard } from './bank-card-interface';
import { Gender } from './gender';

export class CreateUserDto {

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({default: 'aikpeachille55@gmail.com'})
  @IsEmail()
  email: string;

  @ApiProperty({default: 'bestman2022'})
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  dialCode: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ enum: Gender})
  @IsIn(['M', 'F'])
  gender: Gender;

  @ApiProperty({ type: Date })
  birthDay: Date;

  @ApiProperty({ type: String })
  birthPlace: string;

  @ApiProperty({ type: [String] })
  profession: string[];

  @ApiProperty({ type: [String] })
  sectors: string[];

  @ApiProperty({type: [String]})
  webSites: string[];

  @ApiProperty({ type: []})
  address: Address[];

  @ApiProperty({ type: {}})
  bankCard: BankCard;

  @ApiProperty({ type: [String] })
  friends: Friend[];

  @ApiProperty({ type: [String] })
  followers: User[];
  
  @ApiProperty({ enum: [true, false]})
  @IsIn([true, false])
  status: boolean;

  @ApiProperty({ enum: [true, false]})
  @IsIn([true, false])
  isLog: boolean;

  @ApiProperty({ enum: [true, false]})
  @IsIn([true, false])
  isFirstTime: boolean;

  @ApiProperty({ enum: [true, false]})
  @IsIn([true, false])
  isNewFeed: boolean;

  @ApiProperty()
  accountType: string;

  @ApiProperty()
  lastConnected: Date;

}
