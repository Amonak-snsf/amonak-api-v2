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
const common = require("@nestjs/common");
const swagger = require("@nestjs/swagger");
const comment_likes_service = require("./comment-likes.service");
const create_comment_like_dto = require("./dto/create-comment-like.dto");
const update_comment_like_dto = require("./dto/update-comment-like.dto");
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
    (0, common.Post)(),
    __param(0, (0, common.Body)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_like_dto.CreateCommentLikeDto, Object]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "create", null);
__decorate([
    (0, common.Get)(),
    __param(0, (0, common.Query)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_comment_like_dto.UpdateCommentLikeDto, Object]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "findAll", null);
__decorate([
    (0, common.Get)(':comment'),
    __param(0, (0, common.Param)('comment')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "findOne", null);
__decorate([
    (0, common.Patch)(':comment'),
    __param(0, (0, common.Param)('comment')),
    __param(1, (0, common.Body)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_like_dto.UpdateCommentLikeDto, Object]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "update", null);
__decorate([
    (0, common.Delete)(':comment'),
    __param(0, (0, common.Param)('comment')),
    __param(1, (0, common.Body)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_like_dto.UpdateCommentLikeDto, Object]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "remove", null);
CommentLikesController = __decorate([
    (0, swagger.ApiTags)('comments-likes'),
    (0, swagger.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common.Controller)('api/comment-likes'),
    __metadata("design:paramtypes", [comment_likes_service.CommentLikesService])
], CommentLikesController);
exports.CommentLikesController = CommentLikesController;
//# sourceMappingURL=comment-likes.controller.js.map