import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { UserDocument } from 'src/users/entities/user.entity';
import { CreateFriendDto } from './dto/create-friend.dto';
import { FriendDocument } from './entities/friend.entity';
export declare class FriendsService {
    private friendModel;
    private userModel;
    private configService;
    private mailService;
    private to_request;
    private user;
    private friend;
    constructor(friendModel: Model<FriendDocument>, userModel: Model<UserDocument>, configService: ConfigService, mailService: MailService);
    send(cfDto: CreateFriendDto, res: any): Promise<any>;
    reject(cfDto: CreateFriendDto, res: any): Promise<any>;
    accept(cfDto: CreateFriendDto, res: any): Promise<any>;
    block(cfDto: CreateFriendDto, res: any): Promise<any>;
}
