"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemsModule = void 0;
const common = require("@nestjs/common");
const cart_items_service = require("./cart-items.service");
const cart_items_controller = require("./cart-items.controller");
const mongoose = require("@nestjs/mongoose");
const cart_item_entity = require("./entities/cart-item.entity");
const carts_module = require("../carts/carts.module");
let CartItemsModule = class CartItemsModule {
};
CartItemsModule = __decorate([
    (0, common.Module)({
        imports: [
            mongoose.MongooseModule.forFeature([{ name: cart_item_entity.CartItem.name, schema: cart_item_entity.CartItemSchema }]),
            carts_module.CartsModule
        ],
        controllers: [cart_items_controller.CartItemsController],
        providers: [cart_items_service.CartItemsService]
    })
], CartItemsModule);
exports.CartItemsModule = CartItemsModule;
//# sourceMappingURL=cart-items.module.js.map