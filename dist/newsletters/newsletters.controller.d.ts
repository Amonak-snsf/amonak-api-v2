import { NewslettersService } from './newsletters.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { FilterNewsLetterDto } from './dto/filter-newsletter.dto';
export declare class NewslettersController {
    private readonly newslettersService;
    constructor(newslettersService: NewslettersService);
    create(createNewsletterDto: CreateNewsletterDto, res: any): Promise<any>;
    findAll(params: FilterNewsLetterDto, res: any): Promise<any>;
    findOne(_id: string, res: any): Promise<any>;
    update(_id: string, updateNewsletterDto: UpdateNewsletterDto, res: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
}
