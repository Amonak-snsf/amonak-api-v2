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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = exports.Comment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const publication_entity_1 = require("../../publications/entities/publication.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const mongoose = require("mongoose");
const default_model_1 = require("../../utils/default-model");
let Comment = class Comment extends default_model_1.DefaultModel {
};
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String, trim: true }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        (0, mongoose_1.raw)({
            destination: { required: false, trim: true, type: String, select: true },
            type: { required: false, trim: true, type: String, select: true },
            extension: { required: false, trim: true, type: String, select: true },
            originalname: { required: false, trim: true, type: String, select: true },
            filename: { required: false, trim: true, type: String, select: true },
            size: { required: false, trim: true, type: Number, select: true },
            url: { required: false, trim: true, type: String, select: true },
        })
    ]),
    __metadata("design:type", Array)
], Comment.prototype, "files", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Publication' }),
    __metadata("design:type", publication_entity_1.Publication)
], Comment.prototype, "publication", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Comment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [], default: true }),
    __metadata("design:type", Array)
], Comment.prototype, "likes", void 0);
Comment = __decorate([
    (0, mongoose_1.Schema)()
], Comment);
exports.Comment = Comment;
exports.CommentSchema = mongoose_1.SchemaFactory.createForClass(Comment);
//# sourceMappingURL=comment.entity.js.map