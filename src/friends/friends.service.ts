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
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({ message: 'This friendship request already exist !'});
    }

    const from_request = await new this.friendModel({
      from: cfDto.from,
      to: cfDto.to,
      status: Status.requested
    }).save();

    if(from_request){
      this.to_request = await new this.friendModel({
        from: cfDto.to,
        to: cfDto.from,
        status: Status.pending
      }).save();
    }

    if(this.to_request){
       const query1 = { status: true, $push: {friends: from_request._id}};
       this.user = await put(this.userModel, query1, { _id: cfDto.from });
    }

    if(this.user){
      const query2 = { status: true, $push: {friends: this.to_request._id}};
      this.friend = await await put(this.userModel, query2, { _id: cfDto.to });
    }

    if(this.friend){
      return res.status(HttpStatus.OK).json({ message: 'friendship request send with success !'});
    }

    return res.status(HttpStatus.NOT_ACCEPTABLE).json({ message: 'friendship request failed !'});
  }

  async reject(cfDto: CreateFriendDto, res) {

    const query1 = { from: cfDto.from, to: cfDto.to };
    const user = await put(this.friendModel, { status: Status.reject }, query1);
    
    if(user){
      const query2 = { from: cfDto.to, to: cfDto.from };
      this.friend = await put(this.friendModel, { status: Status.reject }, query2);
    }

    if(this.friend){
      const query1 = { status: true, $pull: { friends: user.__id } };
      this.user = await put(this.userModel, query1, { _id: cfDto.from });
    }

    if(this.user){
      const query2 = { status: true, $pull: { friends: this.friend.__id } };
      this.to_request = await put(this.userModel, query2, { _id: cfDto.to });
    }

    if(this.to_request){
      return res.status(HttpStatus.OK).json({ message: 'friend reject request is done with success !'});
    }

    return res.status(HttpStatus.NOT_ACCEPTABLE).json({ message: 'friend reject request failed !'});
  }

  
  async accept(cfDto: CreateFriendDto, res) {

    const query1 = { from: cfDto.from, to: cfDto.to };
    const user = await put(this.friendModel, { status: Status.friends }, query1);

    if(user){
      const query2 = { from: cfDto.to, to: cfDto.from };
      this.friend = await put(this.friendModel, { status: Status.friends }, query2);
    }

    if(this.friend){
      return await res.status(HttpStatus.OK).json({ message: 'friend accept request is done with success !'});
    }

    return res.status(HttpStatus.NOT_ACCEPTABLE).json({ message: 'friend accept request failed !'});
  }

  async block(cfDto: CreateFriendDto, res) {

    const query1 = { from: cfDto.from, to: cfDto.to };
    const user = await put(this.friendModel, { status: Status.block }, query1);
    
    if(user){
      const query2 = { from: cfDto.to, to: cfDto.from };
      this.friend = await put(this.friendModel, { status: Status.block }, query2);
    }

    if(this.friend){
      return await res.status(HttpStatus.OK).json({ message: 'friend block request is done with success !'});
    }

    return res.status(HttpStatus.NOT_ACCEPTABLE).json({ message: 'friend block request failed !'});
  }


}
