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
exports.CreateNotificationDto = void 0;
const swagger = require("@nestjs/swagger");
const class_validator = require("class-validator");
const notification_type_dto = require("./notification-type.dto");
class CreateNotificationDto {
}
__decorate([
    (0, swagger.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "from", void 0);
__decorate([
    (0, swagger.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "to", void 0);
__decorate([
    (0, swagger.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "publication", void 0);
__decorate([
    (0, swagger.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "content", void 0);
__decorate([
    (0, swagger.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "comment", void 0);
__decorate([
    (0, swagger.ApiProperty)({ required: true, type: String }),
    (0, class_validator.IsIn)([notification_type_dto.NotificationType.all, notification_type_dto.NotificationType.comment, notification_type_dto.NotificationType.friendRequest, notification_type_dto.NotificationType.like, notification_type_dto.NotificationType.publication, notification_type_dto.NotificationType.share, notification_type_dto.NotificationType.welcome]),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "type", void 0);
__decorate([
    (0, swagger.ApiProperty)({ required: true, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], CreateNotificationDto.prototype, "status", void 0);
exports.CreateNotificationDto = CreateNotificationDto;
//# sourceMappingURL=create-notification.dto.js.map