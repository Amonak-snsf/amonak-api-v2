import { Model } from 'mongoose';
import { CreatePublicationManagementDto } from './dto/create-publication-management.dto';
import { PubManagementDocument } from './entities/publication-management.entity';
export declare class PublicationManagementsService {
    private readonly pubmanegementModel;
    constructor(pubmanegementModel: Model<PubManagementDocument>);
    create(body: CreatePublicationManagementDto, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<any>;
    findOne(publication_id: string, params: any, res: any): Promise<any>;
    remove(publication_id: string, params: any, res: any): Promise<any>;
}
