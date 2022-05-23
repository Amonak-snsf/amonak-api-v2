import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, one } from 'src/utils/query';
import { CreatePublicationManagementDto } from './dto/create-publication-management.dto';
import { PublicationManagement, PubManagementDocument } from './entities/publication-management.entity';

@Injectable()
export class PublicationManagementsService {
  constructor(@InjectModel(PublicationManagement.name) private readonly pubmanegementModel: Model<PubManagementDocument>){}

  async create(body: CreatePublicationManagementDto, res) {
    
    return await create(this.pubmanegementModel, body);
  }

  async findAll(params, res) {

    const data = await all(this.pubmanegementModel, params, null, { _id: -1 }, params.limit, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(publication: string, params, res) {
    params.publication = publication;

    const data = await one(this.pubmanegementModel, params);

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(publication: string, params, res) {
    params.publication = publication;

    const data = await destroy(this.pubmanegementModel, params);

    return res.status(HttpStatus.OK).json(data);
  }
}
