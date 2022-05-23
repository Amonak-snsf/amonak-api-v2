/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { customFiles, saleBody, userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, one, put } from 'src/utils/query';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationType } from './dto/publication-type.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication, PublicationDocument } from './entities/publication.entity';
import { PublicationManagementsService } from 'src/publication-managements/publication-managements.service'
@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel(Publication.name) private readonly publicationModel: Model<PublicationDocument>,
     private productService: ProductsService,
     private pubManagementService: PublicationManagementsService
  ){}

  async create(body: CreatePublicationDto, res) {

    if((body.type == PublicationType.sale) && !body.share){
      const product = await this.productService.create(saleBody({...body, from: 'publication'}), res);
      body.product = product._id;
    }

    if(body.share && (body.type !== PublicationType.sale)){
      delete body.product
    }

    const data = await create(this.publicationModel, body, 'user', userDataPopulateWithTopten());

    if(body.share){
      const pubManagement = {user: body.user, publication: data._id, type: PublicationType.share, status: true, reason: ''}
      await this.pubManagementService.create(pubManagement, res)
    }

    return res.status(HttpStatus.OK).json(data);

  } 
 
  async findAll(params, res) {
    
    if(params.search){
      params = { status: true, content: {$regex: new RegExp(params.search, 'i')}};
    }

    const data = await all(this.publicationModel, params, null, { _id: -1 }, params.limit, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(_id: string) {
    
    return await one(this.publicationModel, { _id: _id }, null, 'user', userDataPopulateWithTopten());
  }

  async update(_id: string, body: UpdatePublicationDto, res) {

    const data = await put(this.publicationModel, body, { _id: _id }, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(_id: string, res) {
    
    const data = await destroy(this.publicationModel, { _id: _id });

    return res.status(HttpStatus.OK).json(data);
  }

}
