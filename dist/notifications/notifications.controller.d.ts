import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FilterNotification } from './dto/filter-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto, res: any): Promise<any>;
    findAll(params: FilterNotification, res: any): Promise<any>;
    findOne(_id: string, params: FilterNotification, res: any): Promise<any>;
    update(_id: string, updateNotificationDto: UpdateNotificationDto, res: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
}
