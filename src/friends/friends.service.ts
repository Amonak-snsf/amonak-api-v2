import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationsService } from 'src/notifications/notifications.service';
import { all, destroy, one, put } from 'src/utils/query';
import { CreateFriendDto } from './dto/create-friend.dto';
import { Status } from './dto/status-friend.dto';
import { Friend, FriendDocument } from './entities/friend.entity';

@Injectable()
export class FriendsService {

  constructor(@InjectModel(Friend.name) private friendModel: Model<FriendDocument>, 
  private notificationService: NotificationsService,) {}

  async listFriendRequest(user: string){

    const userList: Array<string> = [];

    const friends = await all(this.friendModel, { to: user, status: Status.requested });

    if(friends && friends.length){

      for(let friend of friends){
        userList.push(friend.from)
      }
    }
    
    return userList;
  }

  async one(data: {from: string, to: string}){

    const query = [{ from: data.from, to: data.to, status: Status.friend }, 
      { from: data.to, to: data.from, status: Status.friend }];
    const friend = await one(this.friendModel, { $or: query });
    return friend;
  }

  async listFriend(user: string){
    
    const userList: Array<string> = [];
    const query = [{ from: user, status: Status.friend }, { to: user, status: Status.friend }];
    const friends = await all(this.friendModel, { $or: query });

    if(friends && friends.length){

      for(let friend of friends){
        if(`${friend.from}` === user){
          userList.push(friend.to)
        }
        if(`${friend.to}` === user){
          userList.push(friend.from)
        }
      }
    }
    
    return userList;
  }

  async listSugestions(user: string){

    const userList: Array<string> = [];

    const query = [{ from: user}, { to: user }];
    
    const friends = await all(this.friendModel, { $or: query });
    userList.push(user)
    if(friends && friends.length){

      for(let friend of friends){
        if(`${friend.from}` === user){
          userList.push(friend.to)
        }
        if(`${friend.to}` === user){
          userList.push(friend.from)
        }
      }
    }
    return userList;
  }

  async listUsers(user: string){

    const userList: Array<string> = [];

    const query = [{ from: user}, { to: user }];
    
    const friends = await all(this.friendModel, { $or: query });
    userList.push(user)
    if(friends && friends.length){

      for(let friend of friends){
        if(`${friend.from}` === user){
          userList.push(friend.to)
        }
        if(`${friend.to}` === user){
          userList.push(friend.from)
        }
      }
    }
    return userList;
  }

  async send(cfDto: CreateFriendDto, res) {
    
    const query1 = [{ from: cfDto.from, to: cfDto.to }, { from: cfDto.to, to: cfDto.from }];
    const friend = await one(this.friendModel, { $or: query1 });

    if(friend && friend.Status === Status.requested){
      return res.status(HttpStatus.OK).json({ message: 'friendRequest.friendshipExist'});
    }

    const from_request = await new this.friendModel({
      from: cfDto.from,
      to: cfDto.to,
      status: Status.requested
    }).save();
    await this.createNotification(cfDto.from, cfDto.to, 'friendRequest.send',  `${Status.requested}`);
    return res.status(HttpStatus.OK).json({ message: 'friendRequest.friendRequestSend'});
  }
  
  async reject(cfDto: CreateFriendDto, res) {

    const query1 = {$or: [{ from: cfDto.from, to: cfDto.to }, { to: cfDto.from, from: cfDto.to }]};
    const findOne = await one(this.friendModel, { ...query1, status:  Status.requested});
    if(findOne && `${findOne.from}` === cfDto.from){
      await destroy(this.friendModel, { _id: findOne._id });
      return res.status(HttpStatus.OK).json({ message: 'friendRequest.friendRequestCancel'});
    }
    else{
      const user = await put(this.friendModel, { status: Status.reject }, query1);
      await this.createNotification(cfDto.from, cfDto.to, 'friendRequest.reject',  `${Status.reject}`);
      return res.status(HttpStatus.OK).json({ message: 'friendRequest.friendRequestCancel'});
    }
    
  }

  
  async accept(cfDto: CreateFriendDto, res) {

    const query1 = {$or: [{ from: cfDto.from, to: cfDto.to }, { to: cfDto.from, from: cfDto.to }]};
    const user = await put(this.friendModel, { status: Status.friend }, query1);
    await this.createNotification(cfDto.from, cfDto.to, 'friendRequest.accept',  `${Status.friend}`);
    return await res.status(HttpStatus.OK).json({ message: 'friendRequest.friendRequestAccept'});
  }

  async block(cfDto: CreateFriendDto, res) {

    const query1 = {$or: [{ from: cfDto.from, to: cfDto.to }, { to: cfDto.from, from: cfDto.to }]};
    const user = await put(this.friendModel, { status: Status.block }, query1);
    await this.createNotification(cfDto.from, cfDto.to, 'friendRequest.block',  `${Status.block}`);
    return await res.status(HttpStatus.OK).json({ message: 'friendRequest.friendRequestBloq'});
  }

  async createNotification(from: string, to: string, content: string, type: string){

    const notificationBody = {
      from: from,
      to: to,
      content: content,
      type: type
    }

    await this.notificationService.create(notificationBody)
  }

}
