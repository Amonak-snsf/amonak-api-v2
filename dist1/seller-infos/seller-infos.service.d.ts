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
    private accountType;
    constructor(sellerInforModel: Model<SellerInfoDocument>, userModel: Model<UserDocument>, configService: ConfigService, mailService: MailService);
    findAll(params: any, res: any): Promise<SellerInfo[]>;
    findOne(user: string, res: any): Promise<any>;
    update(user: string, upDto: UpdateSellerInfoDto, file: any, files: any, res: any): Promise<any>;
    manageSellerInfoStatus(user: string, status: any, res: any): Promise<any>;
    status(status: any): any;
}
