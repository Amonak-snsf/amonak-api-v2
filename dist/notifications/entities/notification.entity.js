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
exports.NotificationSchema = exports.Notification = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../../users/entities/user.entity");
const mongoose = require("mongoose");
const publication_entity_1 = require("../../publications/entities/publication.entity");
const notification_type_dto_1 = require("../dto/notification-type.dto");
const class_validator_1 = require("class-validator");
let Notification = class Notification {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity_1.User)
], Notification.prototype, "from", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity_1.User)
], Notification.prototype, "to", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Publication' }),
    __metadata("design:type", publication_entity_1.Publication)
], Notification.prototype, "publication_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, default: true }),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String, default: true }),
    __metadata("design:type", String)
], Notification.prototype, "comment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, default: notification_type_dto_1.NotificationType.all }),
    (0, class_validator_1.IsIn)([notification_type_dto_1.NotificationType.all, notification_type_dto_1.NotificationType.comment, notification_type_dto_1.NotificationType.friend_request, notification_type_dto_1.NotificationType.like, notification_type_dto_1.NotificationType.publication, notification_type_dto_1.NotificationType.share, notification_type_dto_1.NotificationType.welcome]),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Notification.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now }),
    __metadata("design:type", Date)
], Notification.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now }),
    __metadata("design:type", Date)
], Notification.prototype, "seen_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now }),
    __metadata("design:type", Date)
], Notification.prototype, "read_at", void 0);
Notification = __decorate([
    (0, mongoose_1.Schema)()
], Notification);
exports.Notification = Notification;
exports.NotificationSchema = mongoose_1.SchemaFactory.createForClass(Notification);
//# sourceMappingURL=notification.entity.js.map