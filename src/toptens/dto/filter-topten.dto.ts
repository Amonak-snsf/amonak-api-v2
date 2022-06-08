import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { CreateToptenDto } from './create-topten.dto';
import { Status } from './topten-status-interface';

export class FilterToptenDto extends PartialType(OmitType(CreateToptenDto, 
    ['files'] as const)) 
{
  @ApiProperty({type: String, required: false})
  status: Status;

  @ApiProperty({ type: [String], required: false })
  followers: User[];

  @ApiProperty({ type: Number, required: false})
  limit: Number;
}