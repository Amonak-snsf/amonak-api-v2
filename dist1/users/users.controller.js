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
exports.UsersController = void 0;
const common = require("@nestjs/common");
const users_service = require("./users.service");
const update_user_dto = require("./dto/update-user.dto");
const swagger = require("@nestjs/swagger");
const platform_express = require("@nestjs/platform-express");
const multer = require("multer");
const file_uploading = require("../utils/file-uploading");
const filter_user_dto = require("./dto/filter-user.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll(body, res) {
        return this.usersService.findAll(body, res);
    }
    findOne(_id, res) {
        return this.usersService.findOne(_id, res);
    }
    update(_id, updateUserDto, file, res) {
        return this.usersService.update(_id, updateUserDto, file, res);
    }
    remove(_id, res) {
        return this.usersService.remove(_id, res);
    }
};
__decorate([
    (0, common.Get)('users'),
    __param(0, (0, common.Query)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_user_dto.FilterUserDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common.Get)('users/:_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common.Patch)('users/:_id'),
    (0, common.UseInterceptors)((0, platform_express.FileInterceptor)('avatar', {
        storage: (0, multer.diskStorage)({
            destination: './static/images/avatar',
            filename: file_uploading.editFileName,
        }),
        fileFilter: file_uploading.imageFileFilter,
    })),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Body)()),
    __param(2, (0, common.UploadedFile)()),
    __param(3, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto.UpdateUserDto, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common.Delete)('users/:_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, swagger.ApiTags)('users'),
    (0, swagger.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common.Controller)('api/'),
    __metadata("design:paramtypes", [users_service.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map