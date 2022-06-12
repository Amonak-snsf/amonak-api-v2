import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { FriendsService } from '../friends/friends.service';
export declare class UsersService {
    private userModel;
    private friendsService;
    private data;
    constructor(userModel: Model<UserDocument>, friendsService: FriendsService);
    findAll(params: any, res: any): Promise<User[]>;
    findOne(_id: string, res: any): Promise<any>;
    update(_id: string, upDto: UpdateUserDto, res: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
    searchParams(params: any): Promise<any>;
}
