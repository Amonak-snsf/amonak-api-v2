import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { UserDocument } from 'src/users/entities/user.entity';
import { CreateToptenDto } from './dto/create-topten.dto';
import { UpdateToptenDto } from './dto/update-topten.dto';
import { ToptenDocument } from './entities/topten.entity';
export declare class ToptensService {
    private toptenModel;
    private userModel;
    private configService;
    private mailService;
    private data;
    constructor(toptenModel: Model<ToptenDocument>, userModel: Model<UserDocument>, configService: ConfigService, mailService: MailService);
    create(cTdo: CreateToptenDto, res: any): Promise<any>;
    findAll(body: any, res: any): Promise<any>;
    findOne(_id: string, res: any): Promise<any>;
    update(_id: string, updateToptenDto: UpdateToptenDto, res: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
}
