import { CreateAuthDto } from './create-auth.dto';
declare const TokenPasswordAuthDto_base: import("@nestjs/common").Type<Pick<CreateAuthDto, "password">>;
export declare class TokenPasswordAuthDto extends TokenPasswordAuthDto_base {
    token: string;
}
export {};
