"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const comments_controller_1 = require("./comments.controller");
const comment_entity_1 = require("./entities/comment.entity");
const mongoose_1 = require("@nestjs/mongoose");
const publication_management_entity_1 = require("../publication-managements/entities/publication-management.entity");
const notifications_module_1 = require("../notifications/notifications.module");
const comment_gateway_1 = require("./comment.gateway");
const comment_likes_module_1 = require("../comment-likes/comment-likes.module");
let CommentsModule = class CommentsModule {
};
CommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: comment_entity_1.Comment.name, schema: comment_entity_1.CommentSchema },
                { name: publication_management_entity_1.PublicationManagement.name, schema: publication_management_entity_1.PubManagementSchema },
            ]),
            notifications_module_1.NotificationsModule,
            comment_likes_module_1.CommentLikesModule
        ],
        controllers: [comments_controller_1.CommentsController],
        providers: [comments_service_1.CommentsService, comment_gateway_1.CommentGateway]
    })
], CommentsModule);
exports.CommentsModule = CommentsModule;
//# sourceMappingURL=comments.module.js.map