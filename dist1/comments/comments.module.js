"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common = require("@nestjs/common");
const comments_service = require("./comments.service");
const comments_controller = require("./comments.controller");
const comment_entity = require("./entities/comment.entity");
const mongoose = require("@nestjs/mongoose");
const publication_management_entity = require("../publication-managements/entities/publication-management.entity");
const notifications_module = require("../notifications/notifications.module");
let CommentsModule = class CommentsModule {
};
CommentsModule = __decorate([
    (0, common.Module)({
        imports: [
            mongoose.MongooseModule.forFeature([
                { name: comment_entity.Comment.name, schema: comment_entity.CommentSchema },
                { name: publication_management_entity.PublicationManagement.name, schema: publication_management_entity.PubManagementSchema },
            ]),
            notifications_module.NotificationsModule
        ],
        controllers: [comments_controller.CommentsController],
        providers: [comments_service.CommentsService]
    })
], CommentsModule);
exports.CommentsModule = CommentsModule;
//# sourceMappingURL=comments.module.js.map