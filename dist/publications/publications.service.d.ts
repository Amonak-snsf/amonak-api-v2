import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationDocument } from './entities/publication.entity';
import { PublicationManagementsService } from 'src/publication-managements/publication-managements.service';
export declare class PublicationsService {
    private readonly publicationModel;
    private productService;
    private pubManagementService;
    constructor(publicationModel: Model<PublicationDocument>, productService: ProductsService, pubManagementService: PublicationManagementsService);
    create(body: CreatePublicationDto, res: any): Promise<any>;
    findAll(params: any, res?: {}): Promise<Omit<any, never>[]>;
    findOne(_id: string): Promise<any>;
    update(_id: string, body: UpdatePublicationDto, res: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
}
