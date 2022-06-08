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
exports.CreateCartItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_cart_dto_1 = require("../../carts/dto/create-cart.dto");
class CreateCartItemDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_cart_dto_1.CreateCartDto, ['amount', 'isCompleted', 'isWaiting', 'status', 'user'])) {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], CreateCartItemDto.prototype, "cart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], CreateCartItemDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, default: 1 }),
    __metadata("design:type", Number)
], CreateCartItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, default: 1 }),
    __metadata("design:type", Number)
], CreateCartItemDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], CreateCartItemDto.prototype, "user", void 0);
exports.CreateCartItemDto = CreateCartItemDto;
//# sourceMappingURL=create-cart-item.dto.js.map