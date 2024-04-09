import { PartialType } from "@nestjs/swagger";
import { CreateNotificationDto } from "src/notifications/dto/create-notification.dto";

export class CreateMessageDto extends PartialType(CreateNotificationDto) {}
