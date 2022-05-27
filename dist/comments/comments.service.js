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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notifications_service_1 = require("../notifications/notifications.service");
const publication_managements_type_dto_1 = require("../publication-managements/dto/publication-managements-type.dto");
const publication_management_entity_1 = require("../publication-managements/entities/publication-management.entity");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const comment_entity_1 = require("./entities/comment.entity");
const comment_likes_service_1 = require("../comment-likes/comment-likes.service");
let CommentsService = class CommentsService {
    constructor(commentModel, pubmanegementModel, notificationService, commentLikeService) {
        this.commentModel = commentModel;
        this.pubmanegementModel = pubmanegementModel;
        this.notificationService = notificationService;
        this.commentLikeService = commentLikeService;
    }
    async create(createCommentDto, res) {
        const data = await (0, query_1.create)(this.commentModel, createCommentDto, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        await new this.pubmanegementModel({ user: data.user, publication: data.publication, type: publication_managements_type_dto_1.PubManagementType.follow });
        await this.notificationService.create({
            from: data.user,
            content: "publicationComment",
            to: data.to,
            publication: data.publication
        });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(params, res) {
        let commentsLikes = [];
        if (params.search) {
            params = { content: { $regex: new RegExp(params.search, 'i') } };
        }
        let data = await (0, query_1.all)(this.commentModel, params, null, { _id: -1 }, params.limit, 'user', (0, helpers_1.userDataPopulateWithComment)());
        for (let value of data) {
            const likes = await this.commentLikeService.findOne(value._id);
            value.likes = likes;
            commentsLikes.push(value);
        }
        return res.status(common_1.HttpStatus.OK).json(commentsLikes);
    }
    async findOne(_id, res) {
        const data = await (0, query_1.one)(this.commentModel, { _id: _id }, null, 'user', (0, helpers_1.userDataPopulateWithComment)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(_id, updateCommentDto, res) {
        const data = await (0, query_1.put)(this.commentModel, updateCommentDto, { _id: _id });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(_id, res) {
        const data = await (0, query_1.destroy)(this.commentModel, { _id: _id });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_entity_1.Comment.name)),
    __param(1, (0, mongoose_1.InjectModel)(publication_management_entity_1.PublicationManagement.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        notifications_service_1.NotificationsService,
        comment_likes_service_1.CommentLikesService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map