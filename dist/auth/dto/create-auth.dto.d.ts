import { CreateUserDto } from "src/users/dto/create-user.dto";
declare const CreateAuthDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "firstname" | "lastname" | "dial_code" | "phone" | "gender" | "birth_day" | "birth_place" | "profession" | "sectors" | "country_infos" | "address" | "bank_card" | "data" | "friends">>>;
export declare class CreateAuthDto extends CreateAuthDto_base {
}
export {};
