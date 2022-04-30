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
exports.PublicationManagementsController = void 0;
const common = require("@nestjs/common");
const publication_managements_service = require("./publication-managements.service");
const create_publication_management_dto = require("./dto/create-publication-management.dto");
const filter_pubmanagement_dto = require("./dto/filter-pubmanagement.dto");
const swagger = require("@nestjs/swagger");
let PublicationManagementsController = class PublicationManagementsController {
    constructor(publicationManagementsService) {
        this.publicationManagementsService = publicationManagementsService;
    }
    create(body, res) {
        return this.publicationManagementsService.create(body, res);
    }
    findAll(params, res) {
        return this.publicationManagementsService.findAll(params, res);
    }
    findOne(publication, params, res) {
        return this.publicationManagementsService.findOne(publication, params, res);
    }
    remove(publication, params, res) {
        return this.publicationManagementsService.remove(publication, params, res);
    }
};
__decorate([
    (0, common.Post)(),
    __param(0, (0, common.Body)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_publication_management_dto.CreatePublicationManagementDto, Object]),
    __metadata("design:returntype", void 0)
], PublicationManagementsController.prototype, "create", null);
__decorate([
    (0, common.Get)(),
    __param(0, (0, common.Query)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_pubmanagement_dto.FilterPubManagment, Object]),
    __metadata("design:returntype", void 0)
], PublicationManagementsController.prototype, "findAll", null);
__decorate([
    (0, common.Get)(':publication'),
    __param(0, (0, common.Param)('publication')),
    __param(1, (0, common.Query)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_publication_management_dto.CreatePublicationManagementDto, Object]),
    __metadata("design:returntype", void 0)
], PublicationManagementsController.prototype, "findOne", null);
__decorate([
    (0, common.Delete)(':publication'),
    __param(0, (0, common.Param)('publication')),
    __param(1, (0, common.Query)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_publication_management_dto.CreatePublicationManagementDto, Object]),
    __metadata("design:returntype", void 0)
], PublicationManagementsController.prototype, "remove", null);
PublicationManagementsController = __decorate([
    (0, swagger.ApiTags)('publication-managements'),
    (0, swagger.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common.Controller)('api/publication-managements'),
    __metadata("design:paramtypes", [publication_managements_service.PublicationManagementsService])
], PublicationManagementsController);
exports.PublicationManagementsController = PublicationManagementsController;
//# sourceMappingURL=publication-managements.controller.js.map