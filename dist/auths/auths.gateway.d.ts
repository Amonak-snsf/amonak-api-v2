import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
export declare class AuthsGateway {
    private readonly authsService;
    constructor(authsService: AuthsService);
    create(createAuthDto: CreateAuthDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(updateAuthDto: UpdateAuthDto): string;
    remove(id: number): string;
}
