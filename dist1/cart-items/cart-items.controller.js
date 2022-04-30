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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemsController = void 0;
const common = require("@nestjs/common");
const swagger = require("@nestjs/swagger");
const cart_items_service = require("./cart-items.service");
const create_cart_item_dto = require("./dto/create-cart-item.dto");
let CartItemsController = class CartItemsController {
    constructor(cartItemsService) {
        this.cartItemsService = cartItemsService;
    }
    create(createCartItemDto, res) {
        return this.cartItemsService.create(createCartItemDto, res);
    }
    findAll(params, res) {
        return this.cartItemsService.findAll(params, res);
    }
    findOne(cart, res) {
        return this.cartItemsService.findOne(cart, res);
    }
    remove(_id, res) {
        return this.cartItemsService.remove(_id, res);
    }
};
__decorate([
    (0, common.Post)(),
    __param(0, (0, common.Body)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cart_item_dto.CreateCartItemDto, Object]),
    __metadata("design:returntype", void 0)
], CartItemsController.prototype, "create", null);
__decorate([
    (0, common.Get)(),
    __param(0, (0, common.Query)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cart_item_dto.CreateCartItemDto, Object]),
    __metadata("design:returntype", void 0)
], CartItemsController.prototype, "findAll", null);
__decorate([
    (0, common.Get)(':cart'),
    __param(0, (0, common.Param)('cart')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CartItemsController.prototype, "findOne", null);
__decorate([
    (0, common.Delete)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CartItemsController.prototype, "remove", null);
CartItemsController = __decorate([
    (0, swagger.ApiTags)('cart-items'),
    (0, swagger.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common.Controller)('api/cart-items'),
    __metadata("design:paramtypes", [cart_items_service.CartItemsService])
], CartItemsController);
exports.CartItemsController = CartItemsController;
//# sourceMappingURL=cart-items.controller.js.map