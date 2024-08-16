import { Controller, Get, Post, Body, Param, Res } from "@nestjs/common";
import { sendNotificationDTO } from "./notification.dto";
import { NotificationService } from "./notification.service";

@Controller('notification')
export class NotificationController {
   /* constructor(private readonly notificationService: NotificationService) {}
    @Post()
  sendNotification(@Body() pushNotification: sendNotificationDTO) {
    this.notificationService.sendPush(pushNotification);
  }*/
}
