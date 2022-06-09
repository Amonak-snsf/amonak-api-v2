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
exports.FilterNotification = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_notification_dto_1 = require("./create-notification.dto");
class FilterNotification extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_notification_dto_1.CreateNotificationDto, ['comment', 'publication'])) {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    __metadata("design:type", Number)
], FilterNotification.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], FilterNotification.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], FilterNotification.prototype, "seenAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], FilterNotification.prototype, "readAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], FilterNotification.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], FilterNotification.prototype, "type", void 0);
exports.FilterNotification = FilterNotification;
//# sourceMappingURL=filter-notification.dto.js.map