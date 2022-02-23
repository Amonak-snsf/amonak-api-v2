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
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const category_entity_1 = require("../../categories/entities/category.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Product = class Product {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, trim: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String, trim: true }),
    __metadata("design:type", String)
], Product.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, trim: true }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, trim: true, default: 1 }),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, trim: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "max_weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, trim: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "purchase", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, trim: true, default: 'DTN' }),
    __metadata("design:type", String)
], Product.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        url: { required: false, trim: true, type: String, select: true },
        type: { required: false, trim: true, type: String, select: true }
    })),
    __metadata("design:type", Array)
], Product.prototype, "files", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        country_name: { required: false, trim: true, type: String },
        country_code: { required: false, trim: true, type: String },
        state: { required: false, trim: true, type: String },
        city: { required: false, trim: true, type: String },
        postal_code: { required: false, trim: true, type: String },
        street: { required: false, trim: true, type: String },
        full_address: { required: false, trim: true, type: String }
    })),
    __metadata("design:type", Object)
], Product.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Category' }),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity_1.User)
], Product.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: Date.now }),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: Date.now }),
    __metadata("design:type", Date)
], Product.prototype, "updated_at", void 0);
Product = __decorate([
    (0, mongoose_1.Schema)()
], Product);
exports.Product = Product;
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
//# sourceMappingURL=product.entity.js.map