import { Module } from '@nestjs/common';
import { NewslettersService } from './newsletters.service';
import { NewslettersController } from './newsletters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Newsletter, NewsletterSchema } from './entities/newsletter.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Newsletter.name, schema:NewsletterSchema }]),
  ],
  controllers: [NewslettersController],
  providers: [NewslettersService]
})
export class NewslettersModule {}
