"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let MailService = class MailService {
    constructor(mailerService, config) {
        this.mailerService = mailerService;
        this.config = config;
    }
    async sendUserConfirmation(user, token, url) {
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
    async resetPassword(user, url) {
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
    async contact(data, url) {
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
    async newsletter(data, url) {
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
    async topten(data, url) {
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
    async friendRequest(data, url) {
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
    async confirmFriendRequest(data, url) {
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
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService, config_1.ConfigService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map