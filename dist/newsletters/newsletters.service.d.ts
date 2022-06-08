import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { NewsletterDocument } from './entities/newsletter.entity';
export declare class NewslettersService {
    private readonly newsModel;
    private emailService;
    private config;
    constructor(newsModel: Model<NewsletterDocument>, emailService: MailService, config: ConfigService);
    create(createNewsletterDto: CreateNewsletterDto, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<any>;
    findOne(_id: string, res: any): Promise<any>;
    update(_id: string, updateNewsletterDto: UpdateNewsletterDto, res: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
}
