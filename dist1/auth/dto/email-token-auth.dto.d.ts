import { CreateAuthDto } from './create-auth.dto';
declare const EmailTokenAuthDto_base: import("@nestjs/common").Type<Partial<CreateAuthDto>>;
export declare class EmailTokenAuthDto extends EmailTokenAuthDto_base {
    token: string;
}
export {};
