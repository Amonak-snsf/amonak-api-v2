import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { CreateToptenDto } from './create-topten.dto';
import { Status } from './topten-status-interface';

export class UpdateToptenDto extends PartialType(OmitType(CreateToptenDto, 
    ['files', 'name', 'product_nature', 'company', 'duration', 'user_id', 'price', 'website', 'message'] as const)) 
{
    @ApiProperty({ type: [String], required: false })
    followers: User[];

    @ApiProperty({ type: String, required: false, default: Status.close })
    @IsIn([Status.close, Status.disabled, Status.enabled])
    status: Status;
}