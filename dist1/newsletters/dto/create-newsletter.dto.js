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
exports.CreateNewsletterDto = void 0;
const swagger = require("@nestjs/swagger");
const class_validator = require("class-validator");
const newsletter_type_dto = require("../entities/newsletter-type.dto");
class CreateNewsletterDto {
}
__decorate([
    (0, swagger.ApiProperty)({ type: String, required: true }),
    (0, class_validator.IsEmail)(),
    (0, class_validator.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNewsletterDto.prototype, "email", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: String, required: false }),
    __metadata("design:type", String)
], CreateNewsletterDto.prototype, "name", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: String, required: false }),
    __metadata("design:type", String)
], CreateNewsletterDto.prototype, "fullAddress", void 0);
__decorate([
    (0, swagger.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreateNewsletterDto.prototype, "subject", void 0);
__decorate([
    (0, swagger.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreateNewsletterDto.prototype, "message", void 0);
__decorate([
    (0, swagger.ApiProperty)({ required: true, type: String, default: newsletter_type_dto.ContactType.newsletter }),
    __metadata("design:type", String)
], CreateNewsletterDto.prototype, "type", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: Boolean, required: false, default: false }),
    (0, class_validator.IsIn)([true, false]),
    __metadata("design:type", Boolean)
], CreateNewsletterDto.prototype, "status", void 0);
exports.CreateNewsletterDto = CreateNewsletterDto;
//# sourceMappingURL=create-newsletter.dto.js.map