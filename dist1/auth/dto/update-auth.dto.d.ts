import { CreateAuthDto } from './create-auth.dto';
declare const UpdateAuthDto_base: import("@nestjs/common").Type<Omit<CreateAuthDto, "password">>;
export declare class UpdateAuthDto extends UpdateAuthDto_base {
}
export {};
