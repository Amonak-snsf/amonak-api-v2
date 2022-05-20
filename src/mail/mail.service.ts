import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private config: ConfigService) {}

  async sendUserConfirmation(user: User, token: string, url: string) {
    let date = new Date();

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Email confirmation',
      template: 'activate',
      context: { 
        userName: user.userName,
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
        userName: user.userName,
        url: url,
        year: date.getFullYear()
      },
    });
  }

  async contact(data, url: string) {
    let date = new Date();

    await this.mailerService.sendMail({
      to: this.config.get('adminEmail'),
      subject: 'Contact',
      template: 'admin',
      context: { 
        userName: data.email,
        url: url,
        year: date.getFullYear(),
        message: data.message,
        subject: data.subject,
        admin: this.config.get('adminEmail')
      },
    });
  }

  async newsletter(data, url: string) {
    let date = new Date();

    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Newsletter',
      template: 'news-letter',
      context: { 
        userName: data.email,
        url: url,
        year: date.getFullYear()
      },
    });
  }

  async topten(data, url: string) {
    let date = new Date();

    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Topten',
      template: 'topten',
      context: { 
        userName: data.userName,
        url: url,
        year: date.getFullYear()
      },
      attachments: data.files
    });
  }

  async friendRequest(data, url: string) {
    let date = new Date();

    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Friend request',
      template: 'friend-request',
      context: { 
        userName: data.userName,
        url: url,
        year: date.getFullYear()
      }
    });
  }

  async confirmFriendRequest(data, url: string) {
    let date = new Date();

    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Accept invitation',
      template: 'accept-invitation',
      context: { 
        userName: data.userName,
        url: url,
        year: date.getFullYear()
      }
    });
  }
}
