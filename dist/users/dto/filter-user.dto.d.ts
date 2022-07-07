import { CreateUserDto } from './create-user.dto';
declare const FilterUserDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "status" | "password">>>;
export declare class FilterUserDto extends FilterUserDto_base {
    is_new_feed: boolean;
    is_first_time: boolean;
    limit: number;
    search: string;
    sugestion: boolean;
    friend: boolean;
    friendRequest: boolean;
    user: string;
}
export {};
