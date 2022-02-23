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
    
    const data = await all(this.notificationModel, params, null, { created_at: -1 }, params.limit);

    return data;
  }

  async findOne(from: string, params) {

    let query = { $or: [{from: from}, {to: from}], params };
    const data = await all(this.notificationModel, query, null, { created_at: -1 }, params.limit);

    return data;
  }

  async update(id: string, updateNotificationDto) {
    
    const data = await put(this.notificationModel, UpdateNotificationDto, { _id: id }, 'from', userDataPopulateWithComment());

    return data;
  }

  async remove(id: string) {

    const data = await destroy(this.notificationModel, { _id: id });

    return data;
  }
}
