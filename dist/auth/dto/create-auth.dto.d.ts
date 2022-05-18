import { CreateUserDto } from "src/users/dto/create-user.dto";
declare const CreateAuthDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "friends" | "firstName" | "lastName" | "dialCode" | "phone" | "gender" | "birthDay" | "birthPlace" | "profession" | "bankCard">>>;
export declare class CreateAuthDto extends CreateAuthDto_base {
}
export {};
