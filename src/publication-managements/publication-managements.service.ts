import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, one } from 'src/utils/query';
import { CreatePublicationManagementDto } from './dto/create-publication-management.dto';
import { PublicationManagement, PubManagementDocument } from './entities/publication-management.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PubManagementType as type } from './dto/publication-managements-type.dto';
@Injectable()
export class PublicationManagementsService {
  constructor(@InjectModel(PublicationManagement.name) private readonly pubmanegementModel: Model<PubManagementDocument>,
    private readonly notificationsService: NotificationsService
    ){}

  async create(body: CreatePublicationManagementDto, res) {
    let alreadyLike = false;
    if(body.type ===  type.follow || body.type === type.share || body.type === type.save || body.type === type.like || body.type === type.signale){

      let content = (body.type === type.share) ? 'a partagé votre publication' : 'vous suive.';
      if(body.type === type.save) content = 'a enrégistré votre publication';
      if(body.type === type.like) content = 'a aimé votre publication';
      if(body.type === type.signale) content = 'a signalé votre publication';

      if(body.type === type.like){

        const mylikes = await this.findAll({type: type.like, publication: body.publication, user: body.user})
        if(mylikes && mylikes[0]){
          alreadyLike = true;
          this.remove(mylikes[0]._id, {});
        }else{
          const notificationBody ={
            from: body.user,
            to: body.to,
            publication: body.publication,
            content: content,
            type: body.type,
          }
          await this.notificationsService.create(notificationBody);
        }
        
      }else{

        const notificationBody ={
          from: body.user,
          to: body.to,
          publication: body.publication,
          content: content,
          type: body.type,
        }
        await this.notificationsService.create(notificationBody);
      }
      
    }
    
    if(!alreadyLike)return await create(this.pubmanegementModel, body);  
  }

  async findAll(params, res=null) {

    const data = await all(this.pubmanegementModel, params, null, { _id: -1 }, params.limit, 'user', userDataPopulateWithTopten());

    if(res)return res.status(HttpStatus.OK).json(data);
    if(!res)return data;
  }

  async findOne(publication: string, params, res) {
    params.publication = publication;

    const data = await all(this.pubmanegementModel, params);

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(_id: string, params, res=null) {

    const data = await destroy(this.pubmanegementModel, { _id: _id });

    if(res)return res.status(HttpStatus.OK).json(data);
    if(!res)return data;
  }
}
