import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { all, createIfne, destroy, one, put } from 'src/utils/query';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { Newsletter, NewsletterDocument } from './entities/newsletter.entity';

@Injectable()
export class NewslettersService {
  constructor(@InjectModel(Newsletter.name) private readonly newsModel: Model<NewsletterDocument>){}

  async create(createNewsletterDto: CreateNewsletterDto, res) {

    const data = await createIfne(this.newsModel, createNewsletterDto, { email: createNewsletterDto.email });

    return res.status(HttpStatus.OK).json(data);
  }

  async findAll(params, res) {
    
    const data = await all(this.newsModel, params, null, { created_at: -1}, params.limit)

    return await res.status(HttpStatus.OK).json(data);
  }
  
  async findOne(id: string, res) {
    
    const data = await one(this.newsModel, { _id: id });

    return res.status(HttpStatus.OK).json(data);
  }

  async update(id: string, updateNewsletterDto: UpdateNewsletterDto, res) {
    
    const data = await put(this.newsModel, updateNewsletterDto, { _id: id });

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(id: string, res) {
    
    const data = await destroy(this.newsModel, { _id: id });

    return res.status(HttpStatus.OK).json(data);
  }
}
