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
exports.CartSchema = exports.Cart = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose = require("mongoose");
const user_entity_1 = require("../../users/entities/user.entity");
const default_model_1 = require("../../utils/default-model");
const cart_status_dto_1 = require("../dto/cart-status.dto");
let Cart = class Cart extends default_model_1.DefaultModel {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity_1.User)
], Cart.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], Cart.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], Cart.prototype, "tax", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], Cart.prototype, "shipping", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, default: 0 }),
    __metadata("design:type", Number)
], Cart.prototype, "percentage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String, default: cart_status_dto_1.CartStatus.unpaid }),
    (0, class_validator_1.IsIn)([cart_status_dto_1.CartStatus.cancelled, cart_status_dto_1.CartStatus.deleted, cart_status_dto_1.CartStatus.failed, cart_status_dto_1.CartStatus.shippingCost, cart_status_dto_1.CartStatus.shippingRequest, cart_status_dto_1.CartStatus.successfull, cart_status_dto_1.CartStatus.unpaid, cart_status_dto_1.CartStatus.booking]),
    __metadata("design:type", String)
], Cart.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Cart.prototype, "isWaiting", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Cart.prototype, "isCompleted", void 0);
Cart = __decorate([
    (0, mongoose_1.Schema)()
], Cart);
exports.Cart = Cart;
exports.CartSchema = mongoose_1.SchemaFactory.createForClass(Cart);
//# sourceMappingURL=cart.entity.js.map