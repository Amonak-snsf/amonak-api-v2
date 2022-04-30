"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsModule = void 0;
const common = require("@nestjs/common");
const carts_service = require("./carts.service");
const carts_controller = require("./carts.controller");
const mongoose = require("@nestjs/mongoose");
const cart_entity = require("./entities/cart.entity");
let CartsModule = class CartsModule {
};
CartsModule = __decorate([
    (0, common.Module)({
        imports: [
            mongoose.MongooseModule.forFeature([{ name: cart_entity.Cart.name, schema: cart_entity.CartSchema }])
        ],
        controllers: [carts_controller.CartsController],
        providers: [carts_service.CartsService],
        exports: [carts_service.CartsService]
    })
], CartsModule);
exports.CartsModule = CartsModule;
//# sourceMappingURL=carts.module.js.map