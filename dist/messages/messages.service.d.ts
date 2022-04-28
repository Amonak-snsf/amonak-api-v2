import { Model } from 'mongoose';
import { MessageDocument } from './entities/message.entity';
export declare class MessagesService {
    private readonly messageModel;
    constructor(messageModel: Model<MessageDocument>);
    create(createMessageDto: any, files: any): Promise<any>;
    findAll(params: any): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateMessageDto: any): Promise<any>;
    remove(id: string): Promise<number>;
}
