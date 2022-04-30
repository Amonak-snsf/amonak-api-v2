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
const swagger = require("@nestjs/swagger");
const user_entity = require("../entities/user.entity");
class CreateBiographyDto {
}
__decorate([
    (0, swagger.ApiProperty)({ type: user_entity.User }),
    __metadata("design:type", user_entity.User)
], CreateBiographyDto.prototype, "user", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    __metadata("design:type", String)
], CreateBiographyDto.prototype, "relationShip", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [user_entity.User] }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "familyMember", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "interestedBy", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "politics", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "confessions", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "languages", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: Date }),
    __metadata("design:type", Array)
], CreateBiographyDto.prototype, "webSites", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [String] }),
    __metadata("design:type", String)
], CreateBiographyDto.prototype, "networks", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    __metadata("design:type", String)
], CreateBiographyDto.prototype, "status", void 0);
exports.CreateBiographyDto = CreateBiographyDto;
//# sourceMappingURL=create-biography.dto.js.map