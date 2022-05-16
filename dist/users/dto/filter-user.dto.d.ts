import { CreateUserDto } from './create-user.dto';
declare const FilterUserDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "password" | "status">>>;
export declare class FilterUserDto extends FilterUserDto_base {
    is_new_feed: Boolean;
    is_first_time: Boolean;
    limit: Number;
    search: String;
}
export {};
