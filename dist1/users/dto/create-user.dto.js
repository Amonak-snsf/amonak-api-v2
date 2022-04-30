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
const swagger = require("@nestjs/swagger");
const class_validator = require("class-validator");
const gender = require("./gender");
class CreateUserDto {
}
__decorate([
    (0, swagger.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger.ApiProperty)({ default: 'aikpeachille55@gmail.com' }),
    (0, class_validator.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger.ApiProperty)({ default: 'bestman1995' }),
    (0, class_validator.IsNotEmpty)(),
    (0, class_validator.MinLength)(8),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    (0, class_validator.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userName", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "dialCode", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger.ApiProperty)({ enum: gender.Gender }),
    (0, class_validator.IsIn)(['M', 'F']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: Date }),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "birthDay", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "birthPlace", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "profession", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "sectors", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country_infos", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: {} }),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: {} }),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "bankCard", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "data", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "friends", void 0);
__decorate([
    (0, swagger.ApiProperty)({ enum: [true, false] }),
    (0, class_validator.IsIn)([true, false]),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "status", void 0);
__decorate([
    (0, swagger.ApiProperty)({ enum: [true, false] }),
    (0, class_validator.IsIn)([true, false]),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isLog", void 0);
__decorate([
    (0, swagger.ApiProperty)({ enum: [true, false] }),
    (0, class_validator.IsIn)([true, false]),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "is_first_time", void 0);
__decorate([
    (0, swagger.ApiProperty)({ enum: [true, false] }),
    (0, class_validator.IsIn)([true, false]),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "is_new_feed", void 0);
__decorate([
    (0, swagger.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "accountType", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map