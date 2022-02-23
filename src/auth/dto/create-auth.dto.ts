import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateAuthDto extends PartialType(OmitType(CreateUserDto, 
    ['firstname', 'lastname', 'dial_code', 'phone', 'gender', 'birth_day', 'birth_place', 'profession', 'sectors', 'country_infos', 'address', 'bank_card', 'data', 'friends'] as const)) 
{}