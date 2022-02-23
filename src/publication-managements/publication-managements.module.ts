import { Module } from '@nestjs/common';
import { PublicationManagementsService } from './publication-managements.service';
import { PublicationManagementsController } from './publication-managements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationManagement, PubManagementSchema } from './entities/publication-management.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PublicationManagement.name, schema: PubManagementSchema}])
  ],
  controllers: [PublicationManagementsController],
  providers: [PublicationManagementsService]
})
export class PublicationManagementsModule {}
