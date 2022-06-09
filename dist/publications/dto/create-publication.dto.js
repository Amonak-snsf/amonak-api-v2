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
exports.CreatePublicationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreatePublicationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [] }),
    __metadata("design:type", Array)
], CreatePublicationDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "share", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CreatePublicationDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "saleContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "saleType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "alerteType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "alerteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "alerteDuration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "publicity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationDto.prototype, "shareMessage", void 0);
exports.CreatePublicationDto = CreatePublicationDto;
//# sourceMappingURL=create-publication.dto.js.map