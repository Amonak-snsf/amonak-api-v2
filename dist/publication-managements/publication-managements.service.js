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
exports.PublicationManagementsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const publication_management_entity_1 = require("./entities/publication-management.entity");
const notifications_service_1 = require("../notifications/notifications.service");
let PublicationManagementsService = class PublicationManagementsService {
    constructor(pubmanegementModel, notificationsService) {
        this.pubmanegementModel = pubmanegementModel;
        this.notificationsService = notificationsService;
    }
    async create(body, res) {
        if (body.type === 'follow' || body.type === 'share' || body.type === 'save' || body.type === 'like' || body.type === 'signal') {
            let content = (body.type === 'share') ? 'a partagé votre publication' : 'vous suive.';
            if (body.type === 'save')
                content = 'a enrégistré votre publication';
            if (body.type === 'like')
                content = 'a aimé votre publication';
            if (body.type === 'signal')
                content = 'a signalé votre publication';
            const notificationBody = {
                from: body.user,
                to: body.to,
                publication: body.publication,
                content: content,
                type: body.type,
            };
            await this.notificationsService.create(notificationBody);
        }
        return await (0, query_1.create)(this.pubmanegementModel, body);
    }
    async findAll(params, res) {
        const data = await (0, query_1.all)(this.pubmanegementModel, params, null, { _id: -1 }, params.limit, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(publication, params, res) {
        params.publication = publication;
        const data = await (0, query_1.all)(this.pubmanegementModel, params);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(publication, params, res) {
        params.publication = publication;
        const data = await (0, query_1.destroy)(this.pubmanegementModel, params);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
PublicationManagementsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(publication_management_entity_1.PublicationManagement.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notifications_service_1.NotificationsService])
], PublicationManagementsService);
exports.PublicationManagementsService = PublicationManagementsService;
//# sourceMappingURL=publication-managements.service.js.map