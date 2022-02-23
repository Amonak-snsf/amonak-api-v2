import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(body: FilterUserDto, res: any): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string, res: any): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto, file: any, res: any): Promise<any>;
    remove(id: string, res: any): Promise<any>;
}
