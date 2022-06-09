import { CreateNotificationDto } from "./create-notification.dto";
declare const FilterNotification_base: import("@nestjs/common").Type<Partial<Omit<CreateNotificationDto, "comment" | "publication">>>;
export declare class FilterNotification extends FilterNotification_base {
    limit: number;
    status: boolean;
    seenAt: Date;
    readAt: Date;
    to: string;
    type: string;
}
export {};
