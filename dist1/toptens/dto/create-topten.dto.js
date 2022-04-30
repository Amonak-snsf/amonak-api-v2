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
exports.CreateToptenDto = void 0;
const swagger = require("@nestjs/swagger");
const user_entity = require("../../users/entities/user.entity");
const class_validator = require("class-validator");
class CreateToptenDto {
}
__decorate([
    (0, swagger.ApiProperty)({ type: String }),
    (0, class_validator.IsMongoId)(),
    __metadata("design:type", user_entity.User)
], CreateToptenDto.prototype, "user", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: String }),
    (0, class_validator.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateToptenDto.prototype, "name", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    __metadata("design:type", String)
], CreateToptenDto.prototype, "company", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateToptenDto.prototype, "files", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateToptenDto.prototype, "message", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateToptenDto.prototype, "webSites", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [String] }),
    (0, class_validator.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateToptenDto.prototype, "productNature", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    (0, class_validator.IsNotEmpty)(),
    (0, class_validator.IsInt)(),
    __metadata("design:type", String)
], CreateToptenDto.prototype, "duration", void 0);
__decorate([
    (0, swagger.ApiProperty)({}),
    (0, class_validator.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateToptenDto.prototype, "price", void 0);
exports.CreateToptenDto = CreateToptenDto;
//# sourceMappingURL=create-topten.dto.js.map