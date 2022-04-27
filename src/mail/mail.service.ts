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

  async contact(data, url: string) {
    let date = new Date();

    await this.mailerService.sendMail({
      to: this.config.get('admin_email'),
      subject: 'Contact',
      template: 'admin',
      context: { 
        username: data.email,
        url: url,
        year: date.getFullYear(),
        message: data.message,
        subject: data.subject,
        admin: this.config.get('admin_email')
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
        username: data.email,
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
        username: data.username,
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
        username: data.username,
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
        username: data.username,
        url: url,
        year: date.getFullYear()
      }
    });
  }
}
