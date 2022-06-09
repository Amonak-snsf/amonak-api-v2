import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class FilterUserDto extends PartialType(OmitType(CreateUserDto, 
    ['status', 'password'] as const)) 
{
  @ApiProperty({type: Boolean, required: false})
  is_new_feed: boolean;

  @ApiProperty({type: Boolean, required: false})
  is_first_time: boolean;

  @ApiProperty({ type: Number, required: false})
  limit: number;

  @ApiProperty({ type: String, required: false})
  search: string;
}