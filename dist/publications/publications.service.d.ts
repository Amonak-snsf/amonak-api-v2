import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationDocument } from './entities/publication.entity';
import { PublicationManagementsService } from 'src/publication-managements/publication-managements.service';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { ToptensService } from 'src/toptens/toptens.service';
export declare class PublicationsService {
    private readonly publicationModel;
    private productService;
    private mailService;
    private pubManagementService;
    private configService;
    private userService;
    private toptenService;
    constructor(publicationModel: Model<PublicationDocument>, productService: ProductsService, mailService: MailService, pubManagementService: PublicationManagementsService, configService: ConfigService, userService: UsersService, toptenService: ToptensService);
    create(body: CreatePublicationDto, res: any): Promise<any>;
    findAll(params: any, res?: {}): Promise<Omit<any, never>[]>;
    findOne(_id: string): Promise<any>;
    update(_id: string, body: UpdatePublicationDto, res?: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
}
