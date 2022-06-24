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
const comment_entity_1 = require("../comments/entities/comment.entity");
const notifications_service_1 = require("../notifications/notifications.service");
const notification_type_dto_1 = require("../notifications/dto/notification-type.dto");
let CommentLikesService = class CommentLikesService {
    constructor(commentLikeModel, commentModel, notificationService) {
        this.commentLikeModel = commentLikeModel;
        this.commentModel = commentModel;
        this.notificationService = notificationService;
    }
    async create(createCommentLikeDto, res) {
        let data;
        const mycommentsLikes = await this.findAll({ comment: createCommentLikeDto.comment, user: createCommentLikeDto.user });
        if (mycommentsLikes && mycommentsLikes[0]) {
            this.remove(mycommentsLikes[0]._id, {});
        }
        else {
            data = await (0, query_1.create)(this.commentLikeModel, createCommentLikeDto);
        }
        let content = 'a aimé votre commentaire sur une publication';
        const allLikeOfThisComment = await (0, query_1.allDistinct)(this.commentLikeModel, 'user', { comment: createCommentLikeDto.comment });
        if (allLikeOfThisComment) {
            for (let value of allLikeOfThisComment) {
                content = 'a aimé le commentaire d\'une publication que vous avez aussi aimé';
                if (value && `${value}` !== '' && `${value}` !== createCommentLikeDto.commentCreator) {
                    await this.notificationService.create({
                        from: createCommentLikeDto.user,
                        content: content,
                        to: value,
                        comment: createCommentLikeDto.comment,
                        type: notification_type_dto_1.NotificationType.like
                    });
                }
            }
        }
        if (createCommentLikeDto.commentCreator !== `${createCommentLikeDto.user}`) {
            await this.notificationService.create({
                from: createCommentLikeDto.user,
                content: content,
                to: createCommentLikeDto.commentCreator,
                comment: createCommentLikeDto.comment,
                type: notification_type_dto_1.NotificationType.like
            });
        }
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(params, res = null) {
        const data = await (0, query_1.all)(this.commentLikeModel, params);
        if (res)
            return res.status(common_1.HttpStatus.OK).json(data);
        if (!res)
            return data;
    }
    async findOne(comment) {
        return await (0, query_1.all)(this.commentLikeModel, { comment: comment });
    }
    async update(comment, updateCommentLikeDto, res) {
        const data = await (0, query_1.put)(this.commentLikeModel, updateCommentLikeDto, { comment: comment });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(_id, params, res = null) {
        const data = await (0, query_1.destroy)(this.commentLikeModel, { _id: _id });
        if (res)
            return res.status(common_1.HttpStatus.OK).json(data);
        if (!res)
            return data;
    }
};
CommentLikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_like_entity_1.CommentLike.name)),
    __param(1, (0, mongoose_1.InjectModel)(comment_entity_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        notifications_service_1.NotificationsService])
], CommentLikesService);
exports.CommentLikesService = CommentLikesService;
//# sourceMappingURL=comment-likes.service.js.map