import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
export declare class UsersService {
    private userModel;
    private data;
    constructor(userModel: Model<UserDocument>);
    findAll(params: any, res: any): Promise<User[]>;
    findOne(_id: string, res: any): Promise<any>;
    update(_id: string, upDto: UpdateUserDto, file: any, res: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
}
