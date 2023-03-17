import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, one, put } from 'src/utils/query';
import { Message, MessageDocument } from './entities/message.entity';
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
    let distinctMessage = [];

    if(params.status){
      query = {status: params.status};
    }

    if(params.notRead){
      query = {...query, readAt: {'$exists': false}};
    }

    const order = (params.distinct && params.from) ? -1 : 1;

    if(params.userConnectIsNotTheCreator && params.distinct && params.from){
      return this.findUserNotReadMessagesForNotifications(params, query, order);
    }

    if(params.to && params.notRead){
      return this.findUserNotReadMessagesForCount(params, query, order);
    }

    if(params.to && params.from && params.to !=='undefined' && params.from !=='undefined') {
      query = {...query, $or: [{ from: params.from, to: params.to }, { from: params.to, to: params.from }] };
      if(!params.distinct) return this.findUsersInboxMessages(params, query, order);
    }

    if(params.distinct && params.from && params.from !=='undefined' && !params.userConnectIsNotTheCreator){
      distinctMessage = await this.findAllDistinct(params);
      query = {...query, _id: {'$in': distinctMessage}}
    }

    return this.findUsersListWithLastMessage(params, query, order);
  }

  async findUsersListWithLastMessage(params, queryFromParent, order){

    let query = {};
    let filterMessage = [];
    query = queryFromParent;
    let newValue = {};

    const data = await all(this.messageModel, query, null, { _id: order }, params.limit, 'to', userDataPopulateWithTopten());

    for (const value of data) {
        const user = await one(this.userModel, {_id: value.from})
        newValue = value;
        newValue['from'] = user
        filterMessage.push(newValue);
    }

    return filterMessage;
  }

  async findUsersInboxMessages(params, queryFromParent, order){

    let query = {};
    query = queryFromParent;
    const data = await all(this.messageModel, query, null, { _id: order }, 
      params.limit, 'to', userDataPopulateWithTopten());
    return data;
  }

  async findUserNotReadMessagesForNotifications(params, queryFromParent, order){

    let query = {};
    let filterMessage = [];
    let newValue = {};

    if(params.userConnectIsNotTheCreator){
      query = {...queryFromParent, to: params.from};
    }

    const data = await all(this.messageModel, query, null, { _id: order }, params.limit, 'to', userDataPopulateWithTopten());

      for (const value of data) {

        const filter = filterMessage.find(message =>`${message.from._id}` === `${value.from._id}`);
        const user = await one(this.userModel, {_id: value.from})
        newValue = value;
        newValue['from'] = user
        if(!filter)filterMessage.push(newValue);
      }

    return filterMessage;
  }

  async findUserNotReadMessagesForCount(params, queryFromParent, order){
    let query = {};
    query = {...queryFromParent, to: params.to};

    const data = await all(this.messageModel, query, null, { _id: order }, params.limit, 'to', userDataPopulateWithTopten());

    return data;
  }

  async getLastMessagesOfLastConversations(query, userId: string, limit): Promise<any> {
    const user_id = new mongoose.Types.ObjectId(userId)
    const lastConversations = await this.messageModel.aggregate([
      {
        $match: {
          ...query, '$or': [{ from: user_id }, { to: user_id }], 
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ['$from', user_id] },
              then: '$to',
              else: '$from',
            },
          },
          message: {
            $first: '$$ROOT',
          },
        },
      },
      {
        $sort: {
          'message.createdAt': -1,
        },
      },
      {
        '$limit': limit,
      },
    ]);
  
    return lastConversations;
  }
  
  async findAllDistinct(params){

    let query;
    const messagesId: Array<any> = [];
    if(params.notRead){
      query = {...query, readAt: {'$exists': false}};
    }
    const messages = await this.getLastMessagesOfLastConversations(query, params.from, params.limit? parseInt(params.limit): 50);

    for (const message of messages) {
      if(message?.message?._id)messagesId.push(message.message._id);
    }

    return messagesId;
  }

  async findOne(_id: string) {

    const data = await one(this.messageModel, { _id: _id });

    return data;
    
  }

  async update(_id: string, updateMessageDto) {

    let data;

    if(updateMessageDto.readAt && updateMessageDto.from && updateMessageDto.to){
      
      let query = {readAt: {'$exists': false}, from: new mongoose.Types.ObjectId(updateMessageDto.from) , to: new mongoose.Types.ObjectId(updateMessageDto.to)};
      const allNotReadMessages = await all(this.messageModel, query);
      for(let value of allNotReadMessages){
        await put(this.messageModel, {readAt: new Date()}, {_id: value._id}); 
      }
      
    }
    if(updateMessageDto.deleters){
      updateMessageDto.deleters = Array.isArray(updateMessageDto.deleters)? updateMessageDto.deleters : [updateMessageDto.deleters];
      data = await put(this.messageModel, updateMessageDto, { _id: _id });
    }

    if(!updateMessageDto.readAt || (updateMessageDto.readAt && !updateMessageDto.from && !updateMessageDto.to)){
      data = await put(this.messageModel, updateMessageDto, { _id: _id });
    }

    return data;
  }

  async remove(_id: string) {
    
    const data = await destroy(this.messageModel, { _id: _id });

    return data;
  }
}

