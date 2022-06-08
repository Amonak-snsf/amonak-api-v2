import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, one } from 'src/utils/query';
import { CreatePublicationManagementDto } from './dto/create-publication-management.dto';
import { PublicationManagement, PubManagementDocument } from './entities/publication-management.entity';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class PublicationManagementsService {
  constructor(@InjectModel(PublicationManagement.name) private readonly pubmanegementModel: Model<PubManagementDocument>,
    private readonly notificationsService: NotificationsService
    ){}

  async create(body: CreatePublicationManagementDto, res) {
    
    if(body.type === 'follow' || body.type === 'share' || body.type === 'save' || body.type === 'like' || body.type === 'signal'){

      let content = (body.type === 'share') ? 'a partagé votre publication' : 'vous suive.';
      if(body.type === 'save') content = 'a enrégistré votre publication';
      if(body.type === 'like') content = 'a aimé votre publication';
      if(body.type === 'signal') content = 'a signalé votre publication';

      const notificationBody ={
        from: body.user,
        to: body.to,
        publication: body.publication,
        content: content,
        type: body.type,
      }
      await this.notificationsService.create(notificationBody);
    }
    return await create(this.pubmanegementModel, body);
  }

  async findAll(params, res) {

    const data = await all(this.pubmanegementModel, params, null, { _id: -1 }, params.limit, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(publication: string, params, res) {
    params.publication = publication;

    const data = await all(this.pubmanegementModel, params);

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(publication: string, params, res) {
    params.publication = publication;

    const data = await destroy(this.pubmanegementModel, params);

    return res.status(HttpStatus.OK).json(data);
  }
}
