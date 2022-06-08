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
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../users/entities/user.entity");
const class_validator_1 = require("class-validator");
class CreateToptenDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", user_entity_1.User)
], CreateToptenDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateToptenDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateToptenDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [] }),
    __metadata("design:type", Array)
], CreateToptenDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateToptenDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateToptenDto.prototype, "webSites", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateToptenDto.prototype, "productNature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", String)
], CreateToptenDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateToptenDto.prototype, "price", void 0);
exports.CreateToptenDto = CreateToptenDto;
//# sourceMappingURL=create-topten.dto.js.map