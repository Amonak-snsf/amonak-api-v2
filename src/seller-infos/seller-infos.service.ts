/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { AccountType } from 'src/users/dto/user-account-type.enum';
import { User, UserDocument } from 'src/users/entities/user.entity';
import {  userAddress, userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, one, put, create } from 'src/utils/query';
import { Status } from './dto/status-seller-info';
import { UpdateSellerInfoDto } from './dto/update-seller-info.dto';
import { SellerInfo, SellerInfoDocument } from './entities/seller-info.entity';

@Injectable()
export class SellerInfosService {
  private data;
  private accountType;

  constructor(@InjectModel(SellerInfo.name) private sellerInforModel: Model<SellerInfoDocument>,
  @InjectModel(User.name) private userModel: Model<UserDocument>,
  private configService: ConfigService, private mailService: MailService,
  ) {}

  async findAll(params, res): Promise<SellerInfo[]>  {
    
    const data = await all(this.sellerInforModel, params, null, { _id: -1 }, params.limit, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(user: string, res) {

    const data = await one(this.sellerInforModel, { user: user }, null, 'user', userDataPopulateWithTopten())

    return res.status(HttpStatus.OK).json(data);
  }

  async update(user: string, upDto: UpdateSellerInfoDto, res) {
    this.data = upDto;

    const address = userAddress(upDto.address);
    if(address){
      this.data.address = address;
    }

    this.data.status = Status.sellerRequest;

    const seller = await one(this.sellerInforModel, { user: user });
    if(seller){
      await put(this.sellerInforModel, this.data, { user: user });
    }else{
      await create(this.sellerInforModel, this.data);
    }
    
    this.accountType = AccountType.sellerRequest;
    
    const userUpdated = await put(this.userModel, { accountType: this.accountType }, { user: user });

    return res.status(HttpStatus.OK).json(userUpdated);
  }


  async manageSellerInfoStatus(user: string, status, res){

    
    return res.status(HttpStatus.OK).json({status, user, account: this.status(status)});

    await put(this.sellerInforModel, { status: status}, { user: user });
    const account = this.status(status);
    
    await put(this.userModel, { accountType: account }, { user: user } );
    
    return res.status(HttpStatus.OK).json({ message: "User account status has been changed to "+this.accountType+" with success !"});
  }

  status(status){

    if(status == Status.seller){
      this.accountType = AccountType.seller;
    }
    if(status == Status.sellerBloc){
      this.accountType = AccountType.sellerBloc;
    }
    if(status == Status.sellerReject){
      this.accountType = AccountType.sellerReject;
    }
    if(status == Status.sellerRequest){
      this.accountType = AccountType.sellerRequest;
    }
    
    return this.accountType;
  }

}


