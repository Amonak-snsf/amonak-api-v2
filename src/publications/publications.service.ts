/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { saleBody, userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, one, put } from 'src/utils/query';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationType } from './dto/publication-type.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication, PublicationDocument } from './entities/publication.entity';
import { PubManagementType as type } from 'src/publication-managements/dto/publication-managements-type.dto';
import { PublicationManagementsService } from 'src/publication-managements/publication-managements.service'
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { ToptensService } from 'src/toptens/toptens.service';
const isOnline = require("is-online");
var ObjectId = require('mongodb').ObjectID;

@Injectable()
export class PublicationsService {

  constructor(
    @InjectModel(Publication.name) private readonly publicationModel: Model<PublicationDocument>,
     private productService: ProductsService,
     private mailService: MailService,
     private pubManagementService: PublicationManagementsService,
     private configService: ConfigService,
     private userService: UsersService,
     private toptenService: ToptensService
  ){}

  async create(body: CreatePublicationDto, res) {

    if((body.type === PublicationType.sendAlerte) || (body.type === PublicationType.sendAlerteTopten)){
      const userId = body.user;
      const sender = await this.userService.findOne(userId);
      
      if(isOnline){
        const url = `${this.configService.get("frontUrl")}/home`;
        if(body.type === PublicationType.sendAlerte){
        const publication = await this.findOne(body._id);
        this.mailService.alerte({
          publication: publication, 
          message: body.content, 
          map: body.map,
          sender: sender,
          staticUrl: this.configService.get("staticUrl")
        }, url)
        }
        if(body.type === PublicationType.sendAlerteTopten){
          const topten = await this.toptenService.findOne(body._id, null)
          this.mailService.topten({
            topten: topten, 
            sender: sender,
            staticUrl: this.configService.get("staticUrl")
          }, url)
        }
      }
      return res.status(HttpStatus.OK).json({message: "publicationBackend.alerteSend"});
    }
    if((body.type == PublicationType.sale) && !body.share){
      const product = await this.productService.create(saleBody({...body, from: 'publication'}), res);
      body.product = product._id;
    }

    if(body.share && (body.type !== PublicationType.sale)){
      delete body.product
    }

    const data = await create(this.publicationModel, body, 'user', userDataPopulateWithTopten());

    if(body.share){
      const pubManagement = {
        user: body.user, 
        publication: body.share, 
        type: PublicationType.share, 
        status: true, 
        reason: '', 
        to: data.user._id
      }
      await this.pubManagementService.create(pubManagement, res)
    }

    return res.status(HttpStatus.OK).json(data);

  } 
 
  async findAll(params, res = {}) {
    
    const userId = res['accountid'];

    if(params.search){
      params = { status: true, content: {$regex: new RegExp(params.search, 'i')}};
    }

    if(params.greaterThanObjectId && params.search){
      var oid = new ObjectId(params.greaterThanObjectId);
      params = {...params, _id: {$gt: oid}}
    }

    if(params.greaterThanObjectId && !params.search){
      var oid = new ObjectId(params.greaterThanObjectId);
      params = {_id: {$gt: oid}}
    }

    if(userId){
      const publicationIdArray = [];
      let query = {$or: [{user: userId, type: type.softDelete}, {type: type.softDeleteAll}]}
      const states = await this.pubManagementService.findAll(query);
      for(let value of states){
        if(value)publicationIdArray.push(value.publication);
      }
      params = {...params, _id: {'$nin': publicationIdArray}}
    }
    const data = await all(this.publicationModel, params, null, { _id: -1 }, params.limit, 'user', userDataPopulateWithTopten());

    return data;
  }

  async findOne(_id: string) {
    
    return await one(this.publicationModel, { _id: _id }, null, 'user', userDataPopulateWithTopten());
  }

  async update(_id: string, body: UpdatePublicationDto, res = null) {

    const data = await put(this.publicationModel, body, { _id: _id }, 'user', userDataPopulateWithTopten());

    if(res){
      return res.status(HttpStatus.OK).json(data);
    }
  }

  async remove(_id: string, res) {
    
    const data = await destroy(this.publicationModel, { _id: _id });

    return res.status(HttpStatus.OK).json(data);
  }

}
