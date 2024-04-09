import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { all, createIfne, destroy, one, put } from 'src/utils/query';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { ContactType } from './entities/newsletter-type.dto';
import { Newsletter, NewsletterDocument } from './entities/newsletter.entity';

@Injectable()
export class NewslettersService {
  constructor(@InjectModel(Newsletter.name) private readonly newsModel: Model<NewsletterDocument>,
  private emailService: MailService, private config: ConfigService
  ){}

  async create(createNewsletterDto: CreateNewsletterDto, res) {

    const url = this.config.get('frontUrl');
    const data = await createIfne(this.newsModel, createNewsletterDto, { email: createNewsletterDto.email, type: createNewsletterDto.type == ContactType.newsletter ? ContactType.newsletter : null });

    if(data.type == ContactType.contact){
      this.emailService.contact(data, url)
    }

    if(data.type == ContactType.newsletter){
      this.emailService.newsletter(data, url);
    }

    return res.status(HttpStatus.OK).json(data);
  }

  async findAll(params, res) {
    
    const data = await all(this.newsModel, params, null, { _id: -1}, params.limit)

    return await res.status(HttpStatus.OK).json(data);
  }
  
  async findOne(_id: string, res) {
    
    const data = await one(this.newsModel, { _id: _id });

    return res.status(HttpStatus.OK).json(data);
  }

  async update(_id: string, updateNewsletterDto: UpdateNewsletterDto, res) {
    
    const data = await put(this.newsModel, updateNewsletterDto, { _id: _id });

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(_id: string, res) {
    
    const data = await destroy(this.newsModel, { _id: _id });

    return res.status(HttpStatus.OK).json(data);
  }
}
