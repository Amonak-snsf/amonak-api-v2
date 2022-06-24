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
exports.PublicationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const products_service_1 = require("../products/products.service");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const publication_type_dto_1 = require("./dto/publication-type.dto");
const publication_entity_1 = require("./entities/publication.entity");
const publication_managements_type_dto_1 = require("../publication-managements/dto/publication-managements-type.dto");
const publication_managements_service_1 = require("../publication-managements/publication-managements.service");
const mail_service_1 = require("../mail/mail.service");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
const isOnline = require("is-online");
let PublicationsService = class PublicationsService {
    constructor(publicationModel, productService, mailService, pubManagementService, configService, userService) {
        this.publicationModel = publicationModel;
        this.productService = productService;
        this.mailService = mailService;
        this.pubManagementService = pubManagementService;
        this.configService = configService;
        this.userService = userService;
    }
    async create(body, res) {
        if (body.type === publication_type_dto_1.PublicationType.sendAlerte) {
            const userId = body.user;
            const sender = await this.userService.findOne(userId);
            if (isOnline) {
                const url = `${this.configService.get("frontUrl")}/home`;
                const publication = await this.findOne(body._id);
                this.mailService.alerte({
                    publication: publication,
                    message: body.content,
                    map: body.map,
                    sender: sender,
                    staticUrl: this.configService.get("staticUrl")
                }, url);
            }
            return res.status(common_1.HttpStatus.OK).json({ message: "Alerte send with success" });
        }
        if ((body.type == publication_type_dto_1.PublicationType.sale) && !body.share) {
            const product = await this.productService.create((0, helpers_1.saleBody)(Object.assign(Object.assign({}, body), { from: 'publication' })), res);
            body.product = product._id;
        }
        if (body.share && (body.type !== publication_type_dto_1.PublicationType.sale)) {
            delete body.product;
        }
        const data = await (0, query_1.create)(this.publicationModel, body, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        if (body.share) {
            const pubManagement = {
                user: body.user,
                publication: body.share,
                type: publication_type_dto_1.PublicationType.share,
                status: true,
                reason: '',
                to: data.user._id
            };
            await this.pubManagementService.create(pubManagement, res);
        }
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(params, res = {}) {
        const userId = res['accountid'];
        if (params.search) {
            params = { status: true, content: { $regex: new RegExp(params.search, 'i') } };
        }
        if (userId) {
            const publicationIdArray = [];
            let query = { $or: [{ user: userId, type: publication_managements_type_dto_1.PubManagementType.softDelete }, { type: publication_managements_type_dto_1.PubManagementType.softDeleteAll }] };
            const states = await this.pubManagementService.findAll(query);
            for (let value of states) {
                if (value)
                    publicationIdArray.push(value.publication);
            }
            params = Object.assign(Object.assign({}, params), { _id: { '$nin': publicationIdArray } });
        }
        const data = await (0, query_1.all)(this.publicationModel, params, null, { _id: -1 }, params.limit, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        return data;
    }
    async findOne(_id) {
        return await (0, query_1.one)(this.publicationModel, { _id: _id }, null, 'user', (0, helpers_1.userDataPopulateWithTopten)());
    }
    async update(_id, body, res = null) {
        const data = await (0, query_1.put)(this.publicationModel, body, { _id: _id }, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        if (res) {
            return res.status(common_1.HttpStatus.OK).json(data);
        }
    }
    async remove(_id, res) {
        const data = await (0, query_1.destroy)(this.publicationModel, { _id: _id });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
PublicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(publication_entity_1.Publication.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        products_service_1.ProductsService,
        mail_service_1.MailService,
        publication_managements_service_1.PublicationManagementsService,
        config_1.ConfigService,
        users_service_1.UsersService])
], PublicationsService);
exports.PublicationsService = PublicationsService;
//# sourceMappingURL=publications.service.js.map