import { Model } from 'mongoose';
import { CreatePublicationManagementDto } from './dto/create-publication-management.dto';
import { PubManagementDocument } from './entities/publication-management.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
export declare class PublicationManagementsService {
    private readonly pubmanegementModel;
    private readonly notificationsService;
    constructor(pubmanegementModel: Model<PubManagementDocument>, notificationsService: NotificationsService);
    create(body: CreatePublicationManagementDto, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<any>;
    findOne(publication: string, params: any, res: any): Promise<any>;
    remove(publication: string, params: any, res: any): Promise<any>;
}
