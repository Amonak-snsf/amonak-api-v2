import { Model } from 'mongoose';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { NewsletterDocument } from './entities/newsletter.entity';
export declare class NewslettersService {
    private readonly newsModel;
    constructor(newsModel: Model<NewsletterDocument>);
    create(createNewsletterDto: CreateNewsletterDto, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<any>;
    findOne(id: string, res: any): Promise<any>;
    update(id: string, updateNewsletterDto: UpdateNewsletterDto, res: any): Promise<any>;
    remove(id: string, res: any): Promise<any>;
}
