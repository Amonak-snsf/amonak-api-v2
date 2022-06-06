import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { one, put } from 'src/utils/query';
import { CreateFriendDto } from './dto/create-friend.dto';
import { Status } from './dto/status-friend.dto';
import { Friend, FriendDocument } from './entities/friend.entity';

@Injectable()
export class FriendsService {

  private to_request;
  private user;
  private friend;

  constructor(@InjectModel(Friend.name) private friendModel: Model<FriendDocument>,
  @InjectModel(User.name) private userModel: Model<UserDocument>,
  private configService: ConfigService, private mailService: MailService
  ) {}

  async send(cfDto: CreateFriendDto, res) {
    
    const query1 = [{ from: cfDto.from, to: cfDto.to }, { from: cfDto.to, to: cfDto.from }];
    const friend = await one(this.friendModel, { $or: query1 });

    if(friend){

      const query1 = { from: cfDto.from, to: cfDto.to };
      await put(this.friendModel, { status: Status.requested }, query1);

      return res.status(HttpStatus.OK).json({ message: 'friendship request send with success !'});
    }

    const from_request = await new this.friendModel({
      from: cfDto.from,
      to: cfDto.to,
      status: Status.requested
    }).save();

    return res.status(HttpStatus.OK).json({ message: 'friendship request send with success !'});
  }

  async reject(cfDto: CreateFriendDto, res) {

    const query1 = { from: cfDto.from, to: cfDto.to };
    const user = await put(this.friendModel, { status: Status.reject }, query1);
    
    return res.status(HttpStatus.OK).json({ message: 'friend reject request is done with success !'});
  }

  
  async accept(cfDto: CreateFriendDto, res) {

    const query1 = { from: cfDto.from, to: cfDto.to };
    const user = await put(this.friendModel, { status: Status.friends }, query1);

    return await res.status(HttpStatus.OK).json({ message: 'friend accept request is done with success !'});
  }

  async block(cfDto: CreateFriendDto, res) {

    const query1 = { from: cfDto.from, to: cfDto.to };
    const user = await put(this.friendModel, { status: Status.block }, query1);
    
    return await res.status(HttpStatus.OK).json({ message: 'friend block request is done with success !'});
  }


}
