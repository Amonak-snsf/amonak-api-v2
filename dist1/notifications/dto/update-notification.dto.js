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
exports.UpdateNotificationDto = void 0;
const swagger = require("@nestjs/swagger");
const create_notification_dto = require("./create-notification.dto");
class UpdateNotificationDto extends (0, swagger.PartialType)(create_notification_dto.CreateNotificationDto) {
}
__decorate([
    (0, swagger.ApiProperty)({ required: true, type: Date }),
    __metadata("design:type", Date)
], UpdateNotificationDto.prototype, "seenAt", void 0);
__decorate([
    (0, swagger.ApiProperty)({ required: true, type: Date }),
    __metadata("design:type", Date)
], UpdateNotificationDto.prototype, "readAt", void 0);
exports.UpdateNotificationDto = UpdateNotificationDto;
//# sourceMappingURL=update-notification.dto.js.map