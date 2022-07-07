import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { Message } from '../messages/entities/message.entity';

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
    const attachments = [];
    if(data.topten && data.topten.files){
      for(let value of data.topten.files){
        attachments.push({
          filename: value.filename,
          path: `${data.staticUrl}/${value.url}`,
          cid: value.originalname
        })
      }
    }

    await this.mailerService.sendMail({
      to: data.topten?.user?.email,
      subject: 'Topten',
      template: 'topten',
      context: { 
        userName: data.topten?.user?.userName,
        url: url,
        year: date.getFullYear(),
        senderUserName: data.sender?.userName,
        senderName: `${data.sender?.firstName?? ''} ${data.sender?.lastName?? ''}`,
        senderEmail: data.sender?.email,
        senderPhone: data.sender?.phone,
        senderAddress: this.address(data.sender?.address),
      },
      attachments: attachments
    });
  }

  async alerte(data, url: string) {
    let date = new Date();
    const attachments = [];
    if(data.publication && data.publication.files){
      for(let value of data.publication.files){
        attachments.push({
          filename: value.filename,
          path: `${data.staticUrl}/${value.url}`,
          cid: value.originalname
        })
      }
    }
    await this.mailerService.sendMail({
      to: data.publication?.user?.email,
      subject: 'Amonak Alerte',
      template: 'alerte',
      context: { 
        userName: data.publication?.user?.userName,
        url: url,
        year: date.getFullYear(),
        message: data?.message,
        map: data?.map,
        senderUserName: data.sender?.userName,
        senderName: `${data.sender?.firstName?? ''} ${data.sender?.lastName?? ''}`,
        senderEmail: data.sender?.email,
        senderPhone: data.sender?.phone,
        senderAddress: this.address(data.sender?.address),
      },
      attachments: attachments
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

  address(data: Array<any>){

    let address;
    if(data && data.length){
  
      address = data[data.length - 1].fullAddress
        ?? `${data[data.length - 1].state} ${data[data.length - 1].city}, ${data[data.length - 1].countryName}`;
    }
    return address;
  }
}
