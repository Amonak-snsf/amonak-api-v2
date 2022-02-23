import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { AccountType } from 'src/users/dto/user-account-type.enum';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { customFiles, userAddress, userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, one, put } from 'src/utils/query';
import { Status } from './dto/status-seller-info';
import { UpdateSellerInfoDto } from './dto/update-seller-info.dto';
import { SellerInfo, SellerInfoDocument } from './entities/seller-info.entity';

@Injectable()
export class SellerInfosService {
  private data;
  private account_type;
  private fileArray = [];

  constructor(@InjectModel(SellerInfo.name) private sellerInforModel: Model<SellerInfoDocument>,
  @InjectModel(User.name) private userModel: Model<UserDocument>,
  private configService: ConfigService, private mailService: MailService,
  ) {}

  async findAll(params, res): Promise<SellerInfo[]>  {
    
    const data = await all(this.sellerInforModel, params, null, { created_at: -1 }, params.limit, 'user_id', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(user_id: string, res) {

    const data = await one(this.sellerInforModel, { user_id: user_id }, null, 'user_id', userDataPopulateWithTopten())

    return res.status(HttpStatus.OK).json(data);
  }

  async update(user_id: string, upDto: UpdateSellerInfoDto, file, files, res) {
    this.data = upDto;
    
    if(file && file.path){
      const fileReponse = {
        url: `/${file.path}`,
        type: file.mimetype
      };
      this.data.identity_card = fileReponse;
    }
    
    const custom_files = customFiles(files);
    if(custom_files){
      this.data.files = custom_files;
    }
    
    const address = userAddress(upDto.address);
    if(address){
      this.data.address = address;
    }

    this.data.status = Status.read;

    await put(this.sellerInforModel, this.data, { user_id: user_id });
    
    this.account_type = AccountType.pending;

    const user = await put(this.userModel, { account_type: this.account_type }, { user_id: user_id });
    
    return res.status(HttpStatus.OK).json(user);
  }


  async manageSellerInfoStatus(user_id: string, status, res){

    await put(this.sellerInforModel, { status: status}, { user_id: user_id });
    
    const account = this.status(status);
    
    await put(this.userModel, { account_type: account }, { user_id: user_id } );
    
    return res.status(HttpStatus.OK).json({ message: "User account status has been changed to "+this.account_type+" with success !"});
  }

  status(status){

    if(status == Status.accepted){
      this.account_type = AccountType.seller;
    }
    if(status == Status.refused){
      this.account_type = AccountType.refused;
    }
    if(status == Status.cancelled){
      this.account_type = AccountType.cancelled;
    }
    if(status == Status.read){
      this.account_type = AccountType.pending;
    }

    return this.account_type;
  }

}


