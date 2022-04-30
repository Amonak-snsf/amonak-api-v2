"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common = require("@nestjs/common");
const products_service = require("./products.service");
const products_controller = require("./products.controller");
const mongoose = require("@nestjs/mongoose");
const product_entity = require("./entities/product.entity");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    (0, common.Module)({
        imports: [
            mongoose.MongooseModule.forFeature([{ name: product_entity.Product.name, schema: product_entity.ProductSchema }])
        ],
        controllers: [products_controller.ProductsController],
        providers: [products_service.ProductsService],
        exports: [products_service.ProductsService]
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map