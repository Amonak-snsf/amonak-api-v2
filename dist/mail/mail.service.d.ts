import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
export declare class MailService {
    private mailerService;
    private config;
    constructor(mailerService: MailerService, config: ConfigService);
    sendUserConfirmation(user: User, token: string, url: string): Promise<void>;
    resetPassword(user: User, url: string): Promise<void>;
    contact(data: any, url: string): Promise<void>;
    newsletter(data: any, url: string): Promise<void>;
    topten(data: any, url: string): Promise<void>;
    alerte(data: any, url: string): Promise<void>;
    friendRequest(data: any, url: string): Promise<void>;
    confirmFriendRequest(data: any, url: string): Promise<void>;
    address(data: Array<any>): any;
}
