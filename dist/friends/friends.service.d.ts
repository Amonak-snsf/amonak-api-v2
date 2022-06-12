import { Model } from 'mongoose';
import { CreateFriendDto } from './dto/create-friend.dto';
import { FriendDocument } from './entities/friend.entity';
export declare class FriendsService {
    private friendModel;
    constructor(friendModel: Model<FriendDocument>);
    listFriendRequest(user: string): Promise<string[]>;
    listFriend(user: string): Promise<string[]>;
    listSugestions(user: string): Promise<string[]>;
    listUsers(user: string): Promise<string[]>;
    send(cfDto: CreateFriendDto, res: any): Promise<any>;
    reject(cfDto: CreateFriendDto, res: any): Promise<any>;
    accept(cfDto: CreateFriendDto, res: any): Promise<any>;
    block(cfDto: CreateFriendDto, res: any): Promise<any>;
}
