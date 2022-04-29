import { PickType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';

export class UsernamePasswordAuthDto extends PickType(CreateAuthDto, ['userName' ,'password'] as const){}