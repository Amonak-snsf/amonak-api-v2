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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewslettersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mail_service_1 = require("../mail/mail.service");
const query_1 = require("../utils/query");
const newsletter_type_dto_1 = require("./entities/newsletter-type.dto");
const newsletter_entity_1 = require("./entities/newsletter.entity");
let NewslettersService = class NewslettersService {
    constructor(newsModel, emailService, config) {
        this.newsModel = newsModel;
        this.emailService = emailService;
        this.config = config;
    }
    async create(createNewsletterDto, res) {
        const url = this.config.get('frontUrl');
        const data = await (0, query_1.createIfne)(this.newsModel, createNewsletterDto, { email: createNewsletterDto.email, type: createNewsletterDto.type == newsletter_type_dto_1.ContactType.newsletter ? newsletter_type_dto_1.ContactType.newsletter : null });
        if (data.type == newsletter_type_dto_1.ContactType.contact) {
            this.emailService.contact(data, url);
        }
        if (data.type == newsletter_type_dto_1.ContactType.newsletter) {
            this.emailService.newsletter(data, url);
        }
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(params, res) {
        const data = await (0, query_1.all)(this.newsModel, params, null, { _id: -1 }, params.limit);
        return await res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(_id, res) {
        const data = await (0, query_1.one)(this.newsModel, { _id: _id });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(_id, updateNewsletterDto, res) {
        const data = await (0, query_1.put)(this.newsModel, updateNewsletterDto, { _id: _id });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(_id, res) {
        const data = await (0, query_1.destroy)(this.newsModel, { _id: _id });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
NewslettersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(newsletter_entity_1.Newsletter.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mail_service_1.MailService, config_1.ConfigService])
], NewslettersService);
exports.NewslettersService = NewslettersService;
//# sourceMappingURL=newsletters.service.js.map