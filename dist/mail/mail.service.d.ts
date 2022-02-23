import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/entities/user.entity';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: User, token: string, url: string): Promise<void>;
    resetPassword(user: User, url: string): Promise<void>;
}
