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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const gender_1 = require("./gender");
class CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'aikpeachille55@gmail.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'bestman1995' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "dialCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: gender_1.Gender }),
    (0, class_validator_1.IsIn)(['M', 'F']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "birthDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "birthPlace", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "profession", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "sectors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country_infos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object] }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: {} }),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "bankCard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "friends", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [true, false] }),
    (0, class_validator_1.IsIn)([true, false]),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [true, false] }),
    (0, class_validator_1.IsIn)([true, false]),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isLog", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [true, false] }),
    (0, class_validator_1.IsIn)([true, false]),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "is_first_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [true, false] }),
    (0, class_validator_1.IsIn)([true, false]),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "is_new_feed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "accountType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "lastConnected", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map