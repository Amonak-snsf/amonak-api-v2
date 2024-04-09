import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty} from 'class-validator';

export class FirstDisplayDto {

@ApiProperty({ type: String })
@IsNotEmpty()
title: string;

@ApiProperty()
subtitle: string;

@ApiProperty({ type: String})
@IsNotEmpty()
displayNumber: String;

@ApiProperty({ type: String})
@IsNotEmpty()
logo: string;

@ApiProperty({ type: String})
@IsNotEmpty()
image: string;

@ApiProperty({ type: String})
@IsNotEmpty()
buttonTitle: string;
}
    