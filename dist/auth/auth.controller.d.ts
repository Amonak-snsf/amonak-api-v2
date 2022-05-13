import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { EmailAuthDto } from './dto/email-auth.dto';
import { TokenPasswordAuthDto } from './dto/token-password-auth.dto';
import { UsernamePasswordAuthDto } from './dto/username-password-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateAuthDto, file: any, res: any): Promise<any>;
    checkToken(tokenId: string, res: any): Promise<any>;
    resentActivationEmail(emailAuth: EmailAuthDto, res: any): Promise<any>;
    activate(token: number, res: any): Promise<any>;
    sendResetPasswordRequest(email: string, res: any): Promise<any>;
    resetPassword(body: TokenPasswordAuthDto, res: any): Promise<any>;
    login(body: UsernamePasswordAuthDto, res: any): Promise<any>;
    checkEmail(emailAuth: EmailAuthDto, res: any): Promise<any>;
    auth(userId: string, res: any): Promise<any>;
}
