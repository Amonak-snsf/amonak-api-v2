import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
export declare class AuthsService {
    create(createAuthDto: CreateAuthDto): string;
    findAll(): string;
    findOne(_id: number): string;
    update(_id: number, updateAuthDto: UpdateAuthDto): string;
    remove(_id: number): string;
}
