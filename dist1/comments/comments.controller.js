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
exports.CommentsController = void 0;
const common = require("@nestjs/common");
const platform_express = require("@nestjs/platform-express");
const swagger = require("@nestjs/swagger");
const multer = require("multer");
const file_uploading = require("../utils/file-uploading");
const comments_service = require("./comments.service");
const create_comment_dto = require("./dto/create-comment.dto");
const filter_comment_dto = require("./dto/filter-comment.dto");
const update_comment_dto = require("./dto/update-comment.dto");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    create(createCommentDto, files, res) {
        return this.commentsService.create(createCommentDto, files, res);
    }
    findAll(params, res) {
        return this.commentsService.findAll(params, res);
    }
    findOne(_id, res) {
        return this.commentsService.findOne(_id, res);
    }
    update(_id, updateCommentDto, res) {
        return this.commentsService.update(_id, updateCommentDto, res);
    }
    remove(_id, res) {
        return this.commentsService.remove(_id, res);
    }
};
__decorate([
    (0, common.Post)(),
    __param(0, (0, common.Body)()),
    __param(1, (0, common.UploadedFiles)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto.CreateCommentDto, Object, Object]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "create", null);
__decorate([
    (0, common.Get)(),
    __param(0, (0, common.Query)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_comment_dto.FilterComment, Object]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "findAll", null);
__decorate([
    (0, common.Get)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "findOne", null);
__decorate([
    (0, common.Patch)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Body)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_dto.UpdateCommentDto, Object]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "update", null);
__decorate([
    (0, common.Delete)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "remove", null);
CommentsController = __decorate([
    (0, swagger.ApiTags)('comments'),
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
    (0, common.Controller)('api/comments'),
    __metadata("design:paramtypes", [comments_service.CommentsService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map