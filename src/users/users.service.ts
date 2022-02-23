import { HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { bankCard, userAddress } from 'src/utils/helpers';
import { all, destroy, exist, one, put } from 'src/utils/query';

@Injectable()
export class UsersService {
  private data;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
  private configService: ConfigService, private mailService: MailService
  ) {}

  async findAll(params, res): Promise<User[]>  {

    if(params.search){
      params = {status: true, $or: [{username: {$regex: new RegExp(params.search, 'i')}}, {email: {$regex: new RegExp(params.search, 'i')}}, {firstname: {$regex: new RegExp(params.search, 'i')}}, {lastname: {$regex: new RegExp(params.search, 'i')}}]};
    }
    
    const data = await all(this.userModel, params, null, { created_at: -1 }, params.limit, null, null);

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(id: string, res) {

    const data = await one(this.userModel, {_id: id});

    return res.status(HttpStatus.OK).json(data);
  }


  async update(id: string, upDto: UpdateUserDto, file, res) {

    const user = await exist(this.userModel, {_id: id});

    delete upDto.friends;
    this.data = upDto;
    
    if(file && file.path){
      this.data.avatar = `/${file.path}`;
    }
    
    const bank_card = bankCard(upDto.bank_card)
    const address = userAddress(upDto.address);
    if(bank_card){
      this.data.bank_card = bank_card;
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

    const data = await put(this.userModel, this.data, {_id: id});

    return res.status(HttpStatus.OK).json(data);
  }


  async remove(id: string, res) {
    
    const data = await destroy(this.userModel, {_id: id});

    return res.status(HttpStatus.OK).json(data);
  }
  
}
