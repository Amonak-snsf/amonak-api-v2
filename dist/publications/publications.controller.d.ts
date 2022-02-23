import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { FilterPublicationDto } from './dto/filter-publication.dto';
export declare class PublicationsController {
    private readonly publicationsService;
    constructor(publicationsService: PublicationsService);
    create(body: CreatePublicationDto, files: any, res: any): Promise<any>;
    findAll(params: FilterPublicationDto, res: any): Promise<any>;
    findOne(id: string, res: any): Promise<void>;
    update(id: string, body: UpdatePublicationDto, res: any): Promise<any>;
    remove(id: string, res: any): Promise<any>;
}
