import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class FilterUserDto extends PartialType(OmitType(CreateUserDto, 
    ['status', 'password'] as const)) 
{
  @ApiProperty({type: Boolean, required: false})
  is_new_feed: Boolean;

  @ApiProperty({type: Boolean, required: false})
  is_first_time: Boolean;

  @ApiProperty({ type: Number, required: false})
  limit: Number;

  @ApiProperty({ type: String, required: false})
  search: String;
}