import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FilterMessage } from './dto/filter-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, res: any): Promise<any>;
    findAll(params: FilterMessage, res: any): Promise<any>;
    findOne(_id: string, res: any): Promise<any>;
    update(_id: string, updateMessageDto: UpdateMessageDto, res: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
}
