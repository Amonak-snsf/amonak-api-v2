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

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel(Publication.name) private readonly publicationModel: Model<PublicationDocument>,
     private productService: ProductsService
  ){}

  async create(body: CreatePublicationDto, files, res) {

    if(files){
      body.files = customFiles(files);
    }

    if(body.type == PublicationType.sale){
      const product = await this.productService.create(saleBody(body), files, res);
      body.product = product._id;
    }

    const data = await create(this.publicationModel, body, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);

  }

  async findAll(params, res) {
    
    if(params.search){
      params = { status: true, content: {$regex: new RegExp(params.search, 'i')}};
    }

    const data = all(this.publicationModel, params, null, { createdAt: -1 }, params.limit, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(_id: string, res) {
    
    const data = await one(this.publicationModel, { _id: _id }, null, 'user', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
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
