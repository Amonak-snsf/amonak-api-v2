import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationDocument } from './entities/publication.entity';
export declare class PublicationsService {
    private readonly publicationModel;
    private productService;
    constructor(publicationModel: Model<PublicationDocument>, productService: ProductsService);
    create(body: CreatePublicationDto, files: any, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<any>;
    findOne(id: string, res: any): Promise<void>;
    update(id: string, body: UpdatePublicationDto, res: any): Promise<any>;
    remove(id: string, res: any): Promise<any>;
}
