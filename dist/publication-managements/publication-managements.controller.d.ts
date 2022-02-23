import { PublicationManagementsService } from './publication-managements.service';
import { CreatePublicationManagementDto } from './dto/create-publication-management.dto';
import { FilterPubManagment } from './dto/filter-pubmanagement.dto';
export declare class PublicationManagementsController {
    private readonly publicationManagementsService;
    constructor(publicationManagementsService: PublicationManagementsService);
    create(body: CreatePublicationManagementDto, res: any): Promise<any>;
    findAll(params: FilterPubManagment, res: any): Promise<any>;
    findOne(publication_id: string, params: CreatePublicationManagementDto, res: any): Promise<any>;
    remove(publication_id: string, params: CreatePublicationManagementDto, res: any): Promise<any>;
}
