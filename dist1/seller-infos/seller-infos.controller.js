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
exports.SellerInfosController = void 0;
const common = require("@nestjs/common");
const seller_infos_service = require("./seller-infos.service");
const update_seller_info_dto = require("./dto/update-seller-info.dto");
const swagger = require("@nestjs/swagger");
const platform_express = require("@nestjs/platform-express");
const multer = require("multer");
const file_uploading = require("../utils/file-uploading");
const update_seller_status_dto = require("./dto/update-seller-status.dto");
const filter_seller_dto = require("./dto/filter-seller.dto");
let SellerInfosController = class SellerInfosController {
    constructor(sellerInfosService) {
        this.sellerInfosService = sellerInfosService;
    }
    findAll(params, res) {
        return this.sellerInfosService.findAll(params, res);
    }
    findOne(user, res) {
        return this.sellerInfosService.findOne(user, res);
    }
    update(user, updateSellerInfoDto, file, files, res) {
        return this.sellerInfosService.update(user, updateSellerInfoDto, file, files, res);
    }
    manageSellerInfoStatus(user, upDto, res) {
        return this.sellerInfosService.manageSellerInfoStatus(user, upDto.status, res);
    }
};
__decorate([
    (0, common.Get)('seller-infos'),
    __param(0, (0, common.Query)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_seller_dto.FilterSeller, Object]),
    __metadata("design:returntype", void 0)
], SellerInfosController.prototype, "findAll", null);
__decorate([
    (0, common.Get)('seller-infos/:user'),
    __param(0, (0, common.Param)('user')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SellerInfosController.prototype, "findOne", null);
__decorate([
    (0, common.UseInterceptors)((0, platform_express.FileInterceptor)('identityCard', {
        storage: (0, multer.diskStorage)({
            destination: file_uploading.fileDestination,
            filename: file_uploading.editFileName,
        }),
        fileFilter: file_uploading.imageFileFilter2,
    }), (0, platform_express.FilesInterceptor)('files', 5, {
        storage: (0, multer.diskStorage)({
            destination: file_uploading.fileDestination,
            filename: file_uploading.editFileName,
        }),
        fileFilter: file_uploading.imageFileFilter3,
    })),
    (0, common.Patch)('seller-requests/:user'),
    __param(0, (0, common.Param)('user')),
    __param(1, (0, common.Body)()),
    __param(2, (0, common.UploadedFile)()),
    __param(3, (0, common.UploadedFiles)()),
    __param(4, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_seller_info_dto.UpdateSellerInfoDto, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], SellerInfosController.prototype, "update", null);
__decorate([
    (0, common.Put)('seller-managments/:user/status'),
    __param(0, (0, common.Param)('user')),
    __param(1, (0, common.Body)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_seller_status_dto.UpdateSellerStatusDto, Object]),
    __metadata("design:returntype", void 0)
], SellerInfosController.prototype, "manageSellerInfoStatus", null);
SellerInfosController = __decorate([
    (0, swagger.ApiTags)('sellerInfos'),
    (0, swagger.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common.Controller)('api/'),
    __metadata("design:paramtypes", [seller_infos_service.SellerInfosService])
], SellerInfosController);
exports.SellerInfosController = SellerInfosController;
//# sourceMappingURL=seller-infos.controller.js.map