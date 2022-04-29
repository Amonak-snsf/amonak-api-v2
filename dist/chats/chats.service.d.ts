import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
export declare class ChatsService {
    create(createChatDto: CreateChatDto): string;
    findAll(): string;
    findOne(_id: number): string;
    update(_id: number, updateChatDto: UpdateChatDto): string;
    remove(_id: number): string;
}
