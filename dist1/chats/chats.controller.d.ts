import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    create(createChatDto: CreateChatDto): string;
    findAll(): string;
    findOne(_id: string): string;
    update(_id: string, updateChatDto: UpdateChatDto): string;
    remove(_id: string): string;
}
