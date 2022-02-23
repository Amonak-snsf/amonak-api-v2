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
exports.CreateBiographyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../entities/user.entity");
class CreateBiographyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_entity_1.User }),
    __metadata("design:type", user_entity_1.User)
], CreateBiographyDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateBiographyDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [user_entity_1.User] }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "family_member", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "interested_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "politics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "confessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "languages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "web_sites", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", String)
], CreateBiographyDto.prototype, "networks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateBiographyDto.prototype, "status", void 0);
exports.CreateBiographyDto = CreateBiographyDto;
//# sourceMappingURL=create-biography.dto.js.map