import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { firebaseAdminProvider } from './firebase-admin.provider';

@Module({
  providers: [firebaseAdminProvider, NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
