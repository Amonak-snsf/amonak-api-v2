import { CreateNotificationDto } from './create-notification.dto';
declare const UpdateNotificationDto_base: import("@nestjs/common").Type<Partial<CreateNotificationDto>>;
export declare class UpdateNotificationDto extends UpdateNotificationDto_base {
    seen_at: Date;
    read_at: Date;
}
export {};
