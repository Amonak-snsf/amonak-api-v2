import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
export declare class FriendsController {
    private readonly friendsService;
    constructor(friendsService: FriendsService);
    send(createFriendDto: CreateFriendDto, res: any): Promise<any>;
    reject(createFriendDto: CreateFriendDto, res: any): Promise<any>;
    accept(createFriendDto: CreateFriendDto, res: any): Promise<any>;
    block(createFriendDto: CreateFriendDto, res: any): Promise<any>;
}
