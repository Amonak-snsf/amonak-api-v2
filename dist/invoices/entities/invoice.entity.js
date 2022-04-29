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
exports.InvoiceSchema = exports.Invoice = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const cart_entity_1 = require("../../carts/entities/cart.entity");
let Invoice = class Invoice extends cart_entity_1.Cart {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }),
    __metadata("design:type", cart_entity_1.Cart)
], Invoice.prototype, "cart", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String, default: '' }),
    __metadata("design:type", String)
], Invoice.prototype, "comment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String, default: '' }),
    __metadata("design:type", String)
], Invoice.prototype, "paymentType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String, default: '' }),
    __metadata("design:type", String)
], Invoice.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Date, default: '' }),
    __metadata("design:type", Date)
], Invoice.prototype, "paymentDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String, default: '' }),
    __metadata("design:type", String)
], Invoice.prototype, "paymentReference", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Invoice.prototype, "invoiceUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Invoice.prototype, "transactionId", void 0);
Invoice = __decorate([
    (0, mongoose_1.Schema)()
], Invoice);
exports.Invoice = Invoice;
exports.InvoiceSchema = mongoose_1.SchemaFactory.createForClass(Invoice);
//# sourceMappingURL=invoice.entity.js.map