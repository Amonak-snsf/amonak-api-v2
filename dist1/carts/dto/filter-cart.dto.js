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
exports.FilterCart = void 0;
const swagger = require("@nestjs/swagger");
const create_cart_dto = require("./create-cart.dto");
class FilterCart extends (0, swagger.PartialType)((0, swagger.OmitType)(create_cart_dto.CreateCartDto, [])) {
}
__decorate([
    (0, swagger.ApiProperty)({ required: false, type: Number }),
    __metadata("design:type", Number)
], FilterCart.prototype, "limit", void 0);
exports.FilterCart = FilterCart;
//# sourceMappingURL=filter-cart.dto.js.map