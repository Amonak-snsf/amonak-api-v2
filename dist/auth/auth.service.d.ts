import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { TokenDocument } from 'src/users/entities/token.entity';
import { UserDocument } from 'src/users/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { BiographyDocument } from 'src/biographies/entities/biography.entity';
import { SellerInfoDocument } from 'src/seller-infos/entities/seller-info.entity';
export declare class AuthService {
    private userModel;
    private tokenModel;
    private biographyModel;
    private sellerInfoModel;
    private configService;
    private mailService;
    private jwtService;
    private data;
    constructor(userModel: Model<UserDocument>, tokenModel: Model<TokenDocument>, biographyModel: Model<BiographyDocument>, sellerInfoModel: Model<SellerInfoDocument>, configService: ConfigService, mailService: MailService, jwtService: JwtService);
    register(createAuthDto: CreateAuthDto, file: any, res: any): Promise<any>;
    checkToken(tokenId: string, res: any): Promise<any>;
    resentActivationEmail(email: string, res: any): Promise<any>;
    activate(token: number, res: any): Promise<any>;
    sendResetPasswordRequest(email: string, res: any): Promise<any>;
    resetPassword(body: any, res: any): Promise<any>;
    login(body: any, res: any): Promise<any>;
    checkEmail(email: any, res: any): Promise<any>;
    auth(userId: string, res: any): Promise<any>;
    sendUserConfirmation(user: any): Promise<void>;
    sendResetPassswordRequestEmail(user: any): Promise<void>;
    logUser(user: any): Promise<{
        accessToken: string;
        expiresIn: any;
        user: any;
    }>;
}
