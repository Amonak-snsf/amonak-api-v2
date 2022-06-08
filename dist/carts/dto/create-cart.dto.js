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
exports.CreateCartDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const cart_status_dto_1 = require("./cart-status.dto");
class CreateCartDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], CreateCartDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, default: 1 }),
    __metadata("design:type", Number)
], CreateCartDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], CreateCartDto.prototype, "tax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], CreateCartDto.prototype, "shipping", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], CreateCartDto.prototype, "percentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String, default: cart_status_dto_1.CartStatus.unpaid }),
    __metadata("design:type", String)
], CreateCartDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], CreateCartDto.prototype, "isWaiting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CreateCartDto.prototype, "isCompleted", void 0);
exports.CreateCartDto = CreateCartDto;
//# sourceMappingURL=create-cart.dto.js.map