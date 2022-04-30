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
const mongoose = require("@nestjs/mongoose");
const user_entity = require("../../users/entities/user.entity");
const mongoose = require("mongoose");
const publication_entity = require("../../publications/entities/publication.entity");
const notification_type_dto = require("../dto/notification-type.dto");
const class_validator = require("class-validator");
const default_model = require("../../utils/default-model");
let Notification = class Notification extends default_model.DefaultModel {
};
__decorate([
    (0, mongoose.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity.User)
], Notification.prototype, "from", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity.User)
], Notification.prototype, "to", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Publication' }),
    __metadata("design:type", publication_entity.Publication)
], Notification.prototype, "publication", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Notification.prototype, "comment", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, type: String, default: notification_type_dto.NotificationType.all }),
    (0, class_validator.IsIn)([notification_type_dto.NotificationType.all, notification_type_dto.NotificationType.comment, notification_type_dto.NotificationType.friendRequest, notification_type_dto.NotificationType.like, notification_type_dto.NotificationType.publication, notification_type_dto.NotificationType.share, notification_type_dto.NotificationType.welcome]),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Notification.prototype, "status", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false }),
    __metadata("design:type", Date)
], Notification.prototype, "seenAt", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false }),
    __metadata("design:type", Date)
], Notification.prototype, "readAt", void 0);
Notification = __decorate([
    (0, mongoose.Schema)()
], Notification);
exports.Notification = Notification;
exports.NotificationSchema = mongoose.SchemaFactory.createForClass(Notification);
//# sourceMappingURL=notification.entity.js.map