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
exports.CartItemSchema = exports.CartItem = void 0;
const mongoose = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const cart_entity = require("../../carts/entities/cart.entity");
const product_entity = require("../../products/entities/product.entity");
const default_model = require("../../utils/default-model");
let CartItem = class CartItem extends default_model.DefaultModel {
};
__decorate([
    (0, mongoose.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }),
    __metadata("design:type", cart_entity.Cart)
], CartItem.prototype, "cart", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product' }),
    __metadata("design:type", product_entity.Product)
], CartItem.prototype, "product", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, type: Number, default: 1 }),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, type: Number, default: 1 }),
    __metadata("design:type", Number)
], CartItem.prototype, "price", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], CartItem.prototype, "percentage", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], CartItem.prototype, "tax", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], CartItem.prototype, "shipping", void 0);
CartItem = __decorate([
    (0, mongoose.Schema)()
], CartItem);
exports.CartItem = CartItem;
exports.CartItemSchema = mongoose.SchemaFactory.createForClass(CartItem);
//# sourceMappingURL=cart-item.entity.js.map