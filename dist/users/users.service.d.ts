import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { MailService } from 'src/mail/mail.service';
export declare class UsersService {
    private userModel;
    private configService;
    private mailService;
    private data;
    constructor(userModel: Model<UserDocument>, configService: ConfigService, mailService: MailService);
    findAll(params: any, res: any): Promise<User[]>;
    findOne(id: string, res: any): Promise<any>;
    update(id: string, upDto: UpdateUserDto, file: any, res: any): Promise<any>;
    remove(id: string, res: any): Promise<any>;
}
