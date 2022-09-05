/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { CustomBankCard, hashPassword, userAddress } from 'src/utils/helpers';
import { all, destroy, exist, one, put, create } from 'src/utils/query';
import { FriendsService } from '../friends/friends.service';
import { FirstTime, FirstTimeDocument } from './entities/first-time.entity';

@Injectable()
export class UsersService {
  private data;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>
  ,private friendsService: FriendsService, @InjectModel(FirstTime.name) private firstTimeModel: Model<FirstTimeDocument>,) {}

  async firstTimeCreate(body: any){

    const data = await create(this.firstTimeModel, body);

    return data;
  }

  async findAllFirstTime(user: string) {

    const data = await all(this.firstTimeModel, {user: user, status: true});
    return data;
  }

  async findAll(params, res): Promise<User[]>  {

    params = await this.searchParams(params);
    const data = await all(this.userModel, params, null, { _id: -1 }, params.limit, null, null);

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(_id: string, res=null) {

    const data = await one(this.userModel, {_id: _id});

    if(res)return res.status(HttpStatus.OK).json(data);
    if(!res) return data;
  }

  async update(_id: string, upDto: UpdateUserDto, res) {

    const user = await exist(this.userModel, {_id: _id});

    delete upDto.friends;
    this.data = upDto;

    const bankCard = CustomBankCard(upDto.bankCard)
    const address = userAddress(upDto.address);
    if(bankCard){
      this.data.bankCard = bankCard;
    }
    if(address){
      this.data.address = address;
    }
    
    this.data.sectors =  Array.isArray(upDto.sectors) ? upDto.sectors : [upDto.sectors];
    if(user.sectors){
      user.sectors.forEach(sector => {
        if(sector) this.data.sectors.push(sector);
      });
    }

    if(upDto.password && upDto.password.length > 7){
      this.data.password = await hashPassword(upDto.password);
    }

    const data = await put(this.userModel, this.data, {_id: _id});

    return res.status(HttpStatus.OK).json(data);
  }


  async remove(_id: string, res) {
    
    const data = await destroy(this.userModel, {_id: _id});

    return res.status(HttpStatus.OK).json(data);
  }

  async searchParams(params){

    if(params.search){
      params = {status: true, $or: [{userName: {$regex: new RegExp(params.search, 'i')}}, {email: {$regex: new RegExp(params.search, 'i')}}, {firstName: {$regex: new RegExp(params.search, 'i')}}, {lastName: {$regex: new RegExp(params.search, 'i')}}]};
    }

    if(params.followers){
        params = {followers: {'$in': params.followers}};
    }

    if(params.sugestion && params.sugestion === 'true'){
      const userList = await this.friendsService.listSugestions(params.user);
      params = {_id: {'$nin': userList}}
    }

    if(params.friendRequest && params.friendRequest === 'true'){
      
      const userList = await this.friendsService.listFriendRequest(params.user);
      params = {_id: {'$in': userList}}
    }

    if(params.friend && params.friend === 'true'){
      
      const userList = await this.friendsService.listFriend(params.user);
      params = {_id: {'$in': userList}}
    }

    if(params.all && params.all === 'true'){
      const userList = await this.friendsService.listUsers(params.user);
      params = {_id: {'$nin': userList}}
    }

    return params;
  }


  
}
