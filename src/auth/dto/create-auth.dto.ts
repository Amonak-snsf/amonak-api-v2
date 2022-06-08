import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateAuthDto extends PartialType(
  OmitType(CreateUserDto, [
    "firstName",
    "lastName",
    "dialCode",
    "phone",
    "gender",
    "birthDay",
    "birthPlace",
    "profession",
    "bankCard",
    "friends",
  ] as const)
) {}
