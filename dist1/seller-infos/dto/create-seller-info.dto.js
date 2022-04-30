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
exports.CreateSellerInfoDto = void 0;
const swagger = require("@nestjs/swagger");
const class_validator = require("class-validator");
class CreateSellerInfoDto {
}
__decorate([
    (0, swagger.ApiProperty)({ default: 'aikpeachille55@gmail.com' }),
    (0, class_validator.IsEmail)(),
    __metadata("design:type", String)
], CreateSellerInfoDto.prototype, "email", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    __metadata("design:type", String)
], CreateSellerInfoDto.prototype, "phone", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateSellerInfoDto.prototype, "files", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: {} }),
    __metadata("design:type", Object)
], CreateSellerInfoDto.prototype, "identityCard", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: {} }),
    __metadata("design:type", Object)
], CreateSellerInfoDto.prototype, "address", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateSellerInfoDto.prototype, "productNature", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateSellerInfoDto.prototype, "type", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    __metadata("design:type", String)
], CreateSellerInfoDto.prototype, "message", void 0);
exports.CreateSellerInfoDto = CreateSellerInfoDto;
//# sourceMappingURL=create-seller-info.dto.js.map