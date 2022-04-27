import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FilterMessage } from './dto/filter-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, files: any, res: any): Promise<any>;
    findAll(params: FilterMessage, res: any): Promise<any>;
    findOne(id: string, res: any): Promise<any>;
    update(id: string, updateMessageDto: UpdateMessageDto, res: any): Promise<any>;
    remove(id: string, res: any): Promise<any>;
}
