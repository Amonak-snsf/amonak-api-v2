import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDataPopulateWithComment, userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, put } from 'src/utils/query';
import { Notification, NotificationDocument } from './entities/notification.entity';
import { NotificationType } from "./dto/notification-type.dto";

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private readonly notificationModel: Model<NotificationDocument>){}

  async create(createNotificationDto) {
    
    const data = await create(this.notificationModel, createNotificationDto, 'from', userDataPopulateWithTopten());

    return data;
  }

  async findAll(params) {
    
    let filter = {}
    if(params){

      filter = {from: {'$ne' : params.user}, 
      '$or' : [{to: params.user}, {type: NotificationType.all}] };
      if(params.status){
        filter['status'] = params.status;
      }
      if(params.readAt && params.readAt === 'false'){
        filter = {...filter, readAt: { '$exists': false }}
      }
      delete filter['user'];
      delete filter['type'];
    }

    const data = await all(this.notificationModel, filter, null, { _id: -1 }, params.limit, 'from', userDataPopulateWithTopten());

    return data;
  }

  async findOne(from: string, params) {

    let query = { $or: [{from: from}, {to: from}], params };
    const data = await all(this.notificationModel, query, null, { _id: -1 }, params.limit);

    return data;
  }

  async update(_id: string, updateNotificationDto) {
    
    let data;
    if(updateNotificationDto.readAt && updateNotificationDto.to && !updateNotificationDto._id){
       data = await all(this.notificationModel, {to: updateNotificationDto.to});
       
      if(data){
        for(let value of data){
          data = await put(this.notificationModel, {readAt: new Date()}, { _id: value._id });
        }
      }
    }
    else{
      data = await put(this.notificationModel, updateNotificationDto, { _id: _id }, 'from', userDataPopulateWithComment());
    }
    return data;
  }

  async remove(_id: string) {

    const data = await destroy(this.notificationModel, { _id: _id });

    return data;
  }
}
