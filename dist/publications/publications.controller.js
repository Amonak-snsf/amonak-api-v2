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
exports.PublicationsController = void 0;
const common_1 = require("@nestjs/common");
const publications_service_1 = require("./publications.service");
const create_publication_dto_1 = require("./dto/create-publication.dto");
const update_publication_dto_1 = require("./dto/update-publication.dto");
const swagger_1 = require("@nestjs/swagger");
const filter_publication_dto_1 = require("./dto/filter-publication.dto");
let PublicationsController = class PublicationsController {
    constructor(publicationsService) {
        this.publicationsService = publicationsService;
    }
    create(body, res) {
        return this.publicationsService.create(body, res);
    }
    findAll(params, res) {
        return this.publicationsService.findAll(params, res);
    }
    async findOne(_id, res) {
        const data = await this.publicationsService.findOne(_id);
        res.status(common_1.HttpStatus.OK).json(data);
    }
    update(_id, body, res) {
        return this.publicationsService.update(_id, body, res);
    }
    remove(_id, res) {
        return this.publicationsService.remove(_id, res);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_publication_dto_1.CreatePublicationDto, Object]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_publication_dto_1.FilterPublicationDto, Object]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':_id'),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':_id'),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_publication_dto_1.UpdatePublicationDto, Object]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':_id'),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "remove", null);
PublicationsController = __decorate([
    (0, swagger_1.ApiTags)('publications'),
    (0, swagger_1.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common_1.Controller)('api/publications'),
    __metadata("design:paramtypes", [publications_service_1.PublicationsService])
], PublicationsController);
exports.PublicationsController = PublicationsController;
//# sourceMappingURL=publications.controller.js.map