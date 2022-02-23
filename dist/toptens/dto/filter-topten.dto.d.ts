import { User } from 'src/users/entities/user.entity';
import { CreateToptenDto } from './create-topten.dto';
import { Status } from './topten-status-interface';
declare const FilterToptenDto_base: import("@nestjs/common").Type<Partial<Omit<CreateToptenDto, "files">>>;
export declare class FilterToptenDto extends FilterToptenDto_base {
    status: Status;
    followers: User[];
    limit: Number;
}
export {};
