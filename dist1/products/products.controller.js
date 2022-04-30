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
exports.ProductsController = void 0;
const common = require("@nestjs/common");
const products_service = require("./products.service");
const create_product_dto = require("./dto/create-product.dto");
const update_product_dto = require("./dto/update-product.dto");
const platform_express = require("@nestjs/platform-express");
const multer = require("multer");
const file_uploading = require("../utils/file-uploading");
const filter_product_dto = require("./dto/filter-product.dto");
const swagger = require("@nestjs/swagger");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(createProductDto, files, res) {
        return this.productsService.create(createProductDto, files, res);
    }
    findAll(params, res) {
        return this.productsService.findAll(params, res);
    }
    findOne(_id, res) {
        return this.productsService.findOne(_id, res);
    }
    update(_id, updateProductDto, files, res) {
        return this.productsService.update(_id, updateProductDto, files, res);
    }
    remove(_id, res) {
        return this.productsService.remove(_id, res);
    }
};
__decorate([
    (0, common.Post)(),
    __param(0, (0, common.Body)()),
    __param(1, (0, common.UploadedFiles)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto.CreateProductDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common.Get)(),
    __param(0, (0, common.Query)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_product_dto.FilterProductDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common.Get)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common.Patch)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Body)()),
    __param(2, (0, common.UploadedFiles)()),
    __param(3, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto.UpdateProductDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common.Delete)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
ProductsController = __decorate([
    (0, swagger.ApiTags)('products'),
    (0, swagger.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common.UseInterceptors)((0, platform_express.FilesInterceptor)('files', 5, {
        storage: (0, multer.diskStorage)({
            destination: file_uploading.fileDestination,
            filename: file_uploading.editFileName,
        }),
        fileFilter: file_uploading.imageFileFilter3,
    })),
    (0, common.Controller)('api/products'),
    __metadata("design:paramtypes", [products_service.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map