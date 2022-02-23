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
const common_1 = require("@nestjs/common");
const seller_infos_service_1 = require("./seller-infos.service");
const update_seller_info_dto_1 = require("./dto/update-seller-info.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const file_uploading_1 = require("../utils/file-uploading");
const update_seller_status_dto_1 = require("./dto/update-seller-status.dto");
const filter_seller_dto_1 = require("./dto/filter-seller.dto");
let SellerInfosController = class SellerInfosController {
    constructor(sellerInfosService) {
        this.sellerInfosService = sellerInfosService;
    }
    findAll(params, res) {
        return this.sellerInfosService.findAll(params, res);
    }
    findOne(user_id, res) {
        return this.sellerInfosService.findOne(user_id, res);
    }
    update(user_id, updateSellerInfoDto, file, files, res) {
        return this.sellerInfosService.update(user_id, updateSellerInfoDto, file, files, res);
    }
    manageSellerInfoStatus(user_id, upDto, res) {
        return this.sellerInfosService.manageSellerInfoStatus(user_id, upDto.status, res);
    }
};
__decorate([
    (0, common_1.Get)('seller-infos'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_seller_dto_1.FilterSeller, Object]),
    __metadata("design:returntype", void 0)
], SellerInfosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('seller-infos/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SellerInfosController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('identity_card', {
        storage: (0, multer_1.diskStorage)({
            destination: file_uploading_1.fileDestination,
            filename: file_uploading_1.editFileName,
        }),
        fileFilter: file_uploading_1.imageFileFilter2,
    }), (0, platform_express_1.FilesInterceptor)('files', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: file_uploading_1.fileDestination,
            filename: file_uploading_1.editFileName,
        }),
        fileFilter: file_uploading_1.imageFileFilter3,
    })),
    (0, common_1.Patch)('seller-requests/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_seller_info_dto_1.UpdateSellerInfoDto, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], SellerInfosController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('seller-managments/:user_id/status'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_seller_status_dto_1.UpdateSellerStatusDto, Object]),
    __metadata("design:returntype", void 0)
], SellerInfosController.prototype, "manageSellerInfoStatus", null);
SellerInfosController = __decorate([
    (0, swagger_1.ApiTags)('sellerInfos'),
    (0, swagger_1.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common_1.Controller)('api/'),
    __metadata("design:paramtypes", [seller_infos_service_1.SellerInfosService])
], SellerInfosController);
exports.SellerInfosController = SellerInfosController;
//# sourceMappingURL=seller-infos.controller.js.map