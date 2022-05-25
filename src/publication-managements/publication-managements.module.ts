import { Module } from '@nestjs/common';
import { PublicationManagementsService } from './publication-managements.service';
import { PublicationManagementsController } from './publication-managements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationManagement, PubManagementSchema } from './entities/publication-management.entity';
import { NotificationsModule } from 'src/notifications/notifications.module'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: PublicationManagement.name, schema: PubManagementSchema}]),
    NotificationsModule
  ],
  controllers: [PublicationManagementsController],
  providers: [PublicationManagementsService],
  exports: [PublicationManagementsService],
})
export class PublicationManagementsModule {}
