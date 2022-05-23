import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDataPopulateWithComment, userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, put } from 'src/utils/query';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification, NotificationDocument } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private readonly notificationModel: Model<NotificationDocument>){}

  async create(createNotificationDto) {
    
    const data = await create(this.notificationModel, createNotificationDto, 'from', userDataPopulateWithTopten());

    return data;
  }

  async findAll(params) {
    
    const data = await all(this.notificationModel, params, null, { _id: -1 }, params.limit);

    return data;
  }

  async findOne(from: string, params) {

    let query = { $or: [{from: from}, {to: from}], params };
    const data = await all(this.notificationModel, query, null, { _id: -1 }, params.limit);

    return data;
  }

  async update(_id: string, updateNotificationDto) {
    
    const data = await put(this.notificationModel, UpdateNotificationDto, { _id: _id }, 'from', userDataPopulateWithComment());

    return data;
  }

  async remove(_id: string) {

    const data = await destroy(this.notificationModel, { _id: _id });

    return data;
  }
}
