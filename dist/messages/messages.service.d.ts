import { Model } from 'mongoose';
import { MessageDocument } from './entities/message.entity';
import { UserDocument } from 'src/users/entities/user.entity';
export declare class MessagesService {
    private readonly messageModel;
    private readonly userModel;
    constructor(messageModel: Model<MessageDocument>, userModel: Model<UserDocument>);
    create(createMessageDto: any): Promise<any>;
    findAll(params: any): Promise<any[]>;
    findAllDistinct(params: any): Promise<any[]>;
    findOne(_id: string): Promise<any>;
    update(_id: string, updateMessageDto: any): Promise<any>;
    remove(_id: string): Promise<number>;
}
