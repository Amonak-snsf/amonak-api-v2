/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Publication, PublicationSchema } from './entities/publication.entity';
import { ProductsModule } from 'src/products/products.module';
import { PublicationGateway } from './publication.gateway';
import { PublicationManagementsModule } from 'src/publication-managements/publication-managements.module'
import { UsersModule } from 'src/users/users.module';
import { ToptensModule } from 'src/toptens/toptens.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Publication.name, schema: PublicationSchema }]),
  ProductsModule,
  PublicationManagementsModule,
  UsersModule,
  ToptensModule
],
  controllers: [PublicationsController],
  providers: [PublicationsService, PublicationGateway],
  exports: [PublicationsService]
})
export class PublicationsModule {}
