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
exports.CommentLikesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const query_1 = require("../utils/query");
const comment_like_entity_1 = require("./entities/comment-like.entity");
let CommentLikesService = class CommentLikesService {
    constructor(commentModel) {
        this.commentModel = commentModel;
    }
    async create(createCommentLikeDto, res) {
        const data = await (0, query_1.create)(this.commentModel, createCommentLikeDto);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(params, res) {
        const data = await (0, query_1.all)(this.commentModel, params);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(comment, res) {
        const data = await (0, query_1.one)(this.commentModel, { comment: comment });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(comment, updateCommentLikeDto, res) {
        const data = await (0, query_1.put)(this.commentModel, updateCommentLikeDto, { comment: comment });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(comment, params, res) {
        params.comment = comment;
        const data = await (0, query_1.destroy)(this.commentModel, params);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
CommentLikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_like_entity_1.CommentLike.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CommentLikesService);
exports.CommentLikesService = CommentLikesService;
//# sourceMappingURL=comment-likes.service.js.map