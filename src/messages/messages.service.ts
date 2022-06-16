import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, one, put } from 'src/utils/query';
import { Message, MessageDocument } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>){}

  async create(createMessageDto) {
    
    const data = await create(this.messageModel, createMessageDto, 'to', userDataPopulateWithTopten());

    return data;
  }

  async findAll(params) {
    
    let query

    if(params.to && params.from) {
      query = { $or: [{ from: params.from, to: params.to }, { from: params.to, to: params.from }] };
    }
    
    const data = await all(this.messageModel, query, null, { _id: -1 }, params.limit, 'to', userDataPopulateWithTopten());

    return data;
  }

  async findOne(_id: string) {

    const data = await one(this.messageModel, { _id: _id });

    return data;
    
  }

  async update(_id: string, updateMessageDto) {
    
    const data = await put(this.messageModel, updateMessageDto, { _id: _id });

    return data;
  }

  async remove(_id: string) {
    
    const data = await destroy(this.messageModel, { _id: _id });

    return data;
  }
}
