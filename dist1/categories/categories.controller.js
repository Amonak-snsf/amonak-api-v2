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
exports.CategoriesController = void 0;
const common = require("@nestjs/common");
const swagger = require("@nestjs/swagger");
const categories_service = require("./categories.service");
const create_category_dto = require("./dto/create-category.dto");
const filter_category_dto = require("./dto/filter-category.dto");
const update_category_dto = require("./dto/update-category.dto");
const multer = require("multer");
const file_uploading = require("../utils/file-uploading");
const platform_express = require("@nestjs/platform-express");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    create(createCategoryDto, file, res) {
        return this.categoriesService.create(createCategoryDto, file, res);
    }
    findAll(params, res) {
        return this.categoriesService.findAll(params, res);
    }
    findOne(_id, res) {
        return this.categoriesService.findOne(_id, res);
    }
    update(_id, updateCategoryDto, res) {
        return this.categoriesService.update(_id, updateCategoryDto, res);
    }
    remove(_id, res) {
        return this.categoriesService.remove(_id, res);
    }
};
__decorate([
    (0, common.Post)(),
    __param(0, (0, common.Body)()),
    __param(1, (0, common.UploadedFile)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto.CreateCategoryDto, Object, Object]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common.Get)(),
    __param(0, (0, common.Query)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_category_dto.FilterCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common.Get)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common.Patch)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Body)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto.UpdateCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common.Delete)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "remove", null);
CategoriesController = __decorate([
    (0, swagger.ApiTags)('categories'),
    (0, swagger.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common.UseInterceptors)((0, platform_express.FileInterceptor)('image', {
        storage: (0, multer.diskStorage)({
            destination: file_uploading.fileDestination,
            filename: file_uploading.editFileName,
        }),
        fileFilter: file_uploading.imageFileFilter,
    })),
    (0, common.Controller)('api/categories'),
    __metadata("design:paramtypes", [categories_service.CategoriesService])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map