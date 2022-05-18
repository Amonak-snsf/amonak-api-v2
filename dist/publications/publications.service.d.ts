import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationDocument } from './entities/publication.entity';
export declare class PublicationsService {
    private readonly publicationModel;
    private productService;
    constructor(publicationModel: Model<PublicationDocument>, productService: ProductsService);
    create(body: CreatePublicationDto, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<any>;
    findOne(_id: string, res: any): Promise<void>;
    update(_id: string, body: UpdatePublicationDto, res: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
}
