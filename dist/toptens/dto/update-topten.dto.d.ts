import { User } from 'src/users/entities/user.entity';
import { CreateToptenDto } from './create-topten.dto';
import { Status } from './topten-status-interface';
declare const UpdateToptenDto_base: import("@nestjs/common").Type<Partial<Omit<CreateToptenDto, "name" | "user_id" | "files" | "message" | "product_nature" | "company" | "duration" | "website" | "price">>>;
export declare class UpdateToptenDto extends UpdateToptenDto_base {
    followers: User[];
    status: Status;
}
export {};
