import { HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { CustomBankCard, userAddress } from 'src/utils/helpers';
import { all, destroy, exist, one, put } from 'src/utils/query';

@Injectable()
export class UsersService {
  private data;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(params, res): Promise<User[]>  {

    if(params.search){
      params = {status: true, $or: [{userName: {$regex: new RegExp(params.search, 'i')}}, {email: {$regex: new RegExp(params.search, 'i')}}, {firstName: {$regex: new RegExp(params.search, 'i')}}, {lastName: {$regex: new RegExp(params.search, 'i')}}]};
    }
    
    const data = await all(this.userModel, params, null, { createdAt: -1 }, params.limit, null, null);

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(_id: string, res) {

    const data = await one(this.userModel, {_id: _id});

    return res.status(HttpStatus.OK).json(data);
  }

  async update(_id: string, upDto: UpdateUserDto, file, res) {

    const user = await exist(this.userModel, {_id: _id});

    delete upDto.friends;
    this.data = upDto;
    
    if(file && file.path){
      this.data.avatar = `/${file.path}`;
    }
    
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
        this.data.sectors.push(sector);
      });
    }

    const data = await put(this.userModel, this.data, {_id: _id});

    return res.status(HttpStatus.OK).json(data);
  }


  async remove(_id: string, res) {
    
    const data = await destroy(this.userModel, {_id: _id});

    return res.status(HttpStatus.OK).json(data);
  }
  
}
