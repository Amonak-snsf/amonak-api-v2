import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string, url: string) {
    let date = new Date();

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Email confirmation',
      template: 'activate',
      context: { 
        username: user.username,
        url: url,
        token: token,
        year: date.getFullYear()
      },
    });
  }

  async resetPassword(user: User, url: string) {
    let date = new Date();

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset password',
      template: 'reset',
      context: { 
        username: user.username,
        url: url,
        year: date.getFullYear()
      },
    });
  }
}
