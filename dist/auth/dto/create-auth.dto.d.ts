import { CreateUserDto } from "src/users/dto/create-user.dto";
declare const CreateAuthDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "gender" | "dialCode" | "phone" | "firstName" | "lastName" | "birthDay" | "birthPlace" | "profession" | "bankCard" | "friends">>>;
export declare class CreateAuthDto extends CreateAuthDto_base {
}
export {};
