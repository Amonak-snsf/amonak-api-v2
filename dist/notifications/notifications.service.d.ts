import { Model } from 'mongoose';
import { NotificationDocument } from './entities/notification.entity';
export declare class NotificationsService {
    private readonly notificationModel;
    constructor(notificationModel: Model<NotificationDocument>);
    create(createNotificationDto: any): Promise<any>;
    findAll(params: any): Promise<any>;
    findOne(from: string, params: any): Promise<any>;
    update(id: string, updateNotificationDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
