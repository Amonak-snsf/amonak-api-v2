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
exports.CommentLikesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const comment_likes_service_1 = require("./comment-likes.service");
const create_comment_like_dto_1 = require("./dto/create-comment-like.dto");
const update_comment_like_dto_1 = require("./dto/update-comment-like.dto");
let CommentLikesController = class CommentLikesController {
    constructor(commentLikesService) {
        this.commentLikesService = commentLikesService;
    }
    create(createCommentLikeDto, res) {
        return this.commentLikesService.create(createCommentLikeDto, res);
    }
    findAll(params, res) {
        return this.commentLikesService.findAll(params, res);
    }
    findOne(comment, res) {
        return this.commentLikesService.findOne(comment, res);
    }
    update(comment, updateCommentLikeDto, res) {
        return this.commentLikesService.update(comment, updateCommentLikeDto, res);
    }
    remove(comment, updateCommentLikeDto, res) {
        return this.commentLikesService.remove(comment, updateCommentLikeDto, res);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_like_dto_1.CreateCommentLikeDto, Object]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_comment_like_dto_1.UpdateCommentLikeDto, Object]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':comment'),
    __param(0, (0, common_1.Param)('comment')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':comment'),
    __param(0, (0, common_1.Param)('comment')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_like_dto_1.UpdateCommentLikeDto, Object]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':comment'),
    __param(0, (0, common_1.Param)('comment')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_like_dto_1.UpdateCommentLikeDto, Object]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "remove", null);
CommentLikesController = __decorate([
    (0, swagger_1.ApiTags)('comments-likes'),
    (0, swagger_1.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common_1.Controller)('api/comment-likes'),
    __metadata("design:paramtypes", [comment_likes_service_1.CommentLikesService])
], CommentLikesController);
exports.CommentLikesController = CommentLikesController;
//# sourceMappingURL=comment-likes.controller.js.map