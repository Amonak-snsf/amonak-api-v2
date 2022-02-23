import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { UserDocument } from 'src/users/entities/user.entity';
import { UpdateSellerInfoDto } from './dto/update-seller-info.dto';
import { SellerInfo, SellerInfoDocument } from './entities/seller-info.entity';
export declare class SellerInfosService {
    private sellerInforModel;
    private userModel;
    private configService;
    private mailService;
    private data;
    private account_type;
    private fileArray;
    constructor(sellerInforModel: Model<SellerInfoDocument>, userModel: Model<UserDocument>, configService: ConfigService, mailService: MailService);
    findAll(params: any, res: any): Promise<SellerInfo[]>;
    findOne(user_id: string, res: any): Promise<any>;
    update(user_id: string, upDto: UpdateSellerInfoDto, file: any, files: any, res: any): Promise<any>;
    manageSellerInfoStatus(user_id: string, status: any, res: any): Promise<any>;
    status(status: any): any;
}
