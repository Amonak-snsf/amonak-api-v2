import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, allDistinct, create, destroy, one, put } from 'src/utils/query';
import { Message, MessageDocument } from './entities/message.entity';
import { Status } from '../toptens/dto/topten-status-interface';
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
  @InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

  async create(createMessageDto) {
    
    const data = await create(this.messageModel, createMessageDto, 'to', userDataPopulateWithTopten());

    return data;
  }

  async findAll(params) {
    
    let query;
    let filterMessage = [];
    let distinctMessage = [];

    if(params.to && params.from && params.to !=='undefined' && params.from !=='undefined') {
      query = { $or: [{ from: params.from, to: params.to }, { from: params.to, to: params.from }] };
    }
    if(params.distinct && params.from && params.from !=='undefined'){
      distinctMessage = await this.findAllDistinct(params);
      query = {$or: [{to: {'$nin': distinctMessage}}, {from: {'$nin': distinctMessage}}]};
    }

    if(params.status){
      query = {...query, status: params.status};
    }

    if(params.notRead){
      query = {...query, readAt: {'$exists': false}};
    }

    const data = await all(this.messageModel, query, null, { _id: -1 }, params.limit, 'to', userDataPopulateWithTopten());

    if(params.distinct && params.from){
      let newValue = {};
      for (const value of data) {
        if(distinctMessage.includes(`${value.from}`) || distinctMessage.includes(`${value.to._id}`)){

          const filter = filterMessage.find(message => 
            {
              return ((`${message.from._id}` === `${value.from}`) || (`${message.to._id}` === `${value.from}`))
            });
          const user = await one(this.userModel, {_id: value.from})

          newValue = value;
          newValue['from'] = user
          if(!filter)filterMessage.push(newValue);
        }
      }
    }

    if(params.distinct && params.from){
      return filterMessage;
    }
    return data;
  }

  async findAllDistinct(params){

    let query;
    const userList: Array<any> = [];

    if(params.from) {
      query = { $or: [{ from: params.from}, { to: params.from}] };
    }
    const data = await allDistinct(this.messageModel, 'to', query);

    if(data && data.length){

      for(let to of data){
        if(`${to}` !== params.from){
          userList.push(`${to}`);
        }
      }
    }
    return userList;
  }

  async findOne(_id: string) {

    const data = await one(this.messageModel, { _id: _id });

    return data;
    
  }

  async update(_id: string, updateMessageDto) {

    let data;

    if(updateMessageDto.readAt){

      let query = {from: updateMessageDto.from, to: updateMessageDto.to, notRead: true};
      const all = await this.findAll(query);
      for(let value of all){
        await put(this.messageModel, {readAt: new Date()}, {_id: value._id});
        console.log(all.length, query)
      }
      
    }
    if(updateMessageDto.readers){
      updateMessageDto.readers = Array.isArray(updateMessageDto.readers)? updateMessageDto.readers : [updateMessageDto.readers];
    }

    if(!updateMessageDto.readAt){
      data = await put(this.messageModel, updateMessageDto, { _id: _id });
    }

    return data;
  }

  async remove(_id: string) {
    
    const data = await destroy(this.messageModel, { _id: _id });

    return data;
  }
}
