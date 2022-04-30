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
let PublicationManagementsService = class PublicationManagementsService {
    constructor(pubmanegementModel) {
        this.pubmanegementModel = pubmanegementModel;
    }
    async create(body, res) {
        const data = await (0, query_1.create)(this.pubmanegementModel, body);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(params, res) {
        const data = await (0, query_1.all)(this.pubmanegementModel, params, null, { createdAt: -1 }, params.limit, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(publication, params, res) {
        params.publication = publication;
        const data = await (0, query_1.one)(this.pubmanegementModel, params);
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
    __metadata("design:paramtypes", [mongoose_2.Model])
], PublicationManagementsService);
exports.PublicationManagementsService = PublicationManagementsService;
//# sourceMappingURL=publication-managements.service.js.map