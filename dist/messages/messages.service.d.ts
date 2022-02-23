import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageDocument } from './entities/message.entity';
export declare class MessagesService {
    private readonly messageModel;
    constructor(messageModel: Model<MessageDocument>);
    create(createMessageDto: CreateMessageDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMessageDto: UpdateMessageDto): string;
    remove(id: number): string;
}
