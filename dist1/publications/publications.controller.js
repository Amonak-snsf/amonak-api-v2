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
const common = require("@nestjs/common");
const publications_service = require("./publications.service");
const create_publication_dto = require("./dto/create-publication.dto");
const update_publication_dto = require("./dto/update-publication.dto");
const swagger = require("@nestjs/swagger");
const platform_express = require("@nestjs/platform-express");
const multer = require("multer");
const file_uploading = require("../utils/file-uploading");
const filter_publication_dto = require("./dto/filter-publication.dto");
let PublicationsController = class PublicationsController {
    constructor(publicationsService) {
        this.publicationsService = publicationsService;
    }
    create(body, files, res) {
        return this.publicationsService.create(body, files, res);
    }
    findAll(params, res) {
        return this.publicationsService.findAll(params, res);
    }
    findOne(_id, res) {
        return this.publicationsService.findOne(_id, res);
    }
    update(_id, body, res) {
        return this.publicationsService.update(_id, body, res);
    }
    remove(_id, res) {
        return this.publicationsService.remove(_id, res);
    }
};
__decorate([
    (0, common.Post)(),
    __param(0, (0, common.Body)()),
    __param(1, (0, common.UploadedFiles)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_publication_dto.CreatePublicationDto, Object, Object]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "create", null);
__decorate([
    (0, common.Get)(),
    __param(0, (0, common.Query)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_publication_dto.FilterPublicationDto, Object]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "findAll", null);
__decorate([
    (0, common.Get)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "findOne", null);
__decorate([
    (0, common.Patch)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Body)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_publication_dto.UpdatePublicationDto, Object]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "update", null);
__decorate([
    (0, common.Delete)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "remove", null);
PublicationsController = __decorate([
    (0, swagger.ApiTags)('publications'),
    (0, swagger.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common.UseInterceptors)((0, platform_express.FilesInterceptor)('files', 5, {
        storage: (0, multer.diskStorage)({
            destination: file_uploading.fileDestination,
            filename: file_uploading.editFileName,
        }),
        fileFilter: file_uploading.imageFileFilter,
    })),
    (0, common.Controller)('api/publications'),
    __metadata("design:paramtypes", [publications_service.PublicationsService])
], PublicationsController);
exports.PublicationsController = PublicationsController;
//# sourceMappingURL=publications.controller.js.map