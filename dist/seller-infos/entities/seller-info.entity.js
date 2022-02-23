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
exports.SellerInfoSchema = exports.SellerInfo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_entity_1 = require("../../users/entities/user.entity");
const status_seller_info_1 = require("../dto/status-seller-info");
let SellerInfo = class SellerInfo {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity_1.User)
], SellerInfo.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: status_seller_info_1.Status }),
    __metadata("design:type", Number)
], SellerInfo.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        url: { required: false, trim: true, type: String, select: true },
        type: { required: false, trim: true, type: String, select: true }
    })),
    __metadata("design:type", Array)
], SellerInfo.prototype, "files", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        url: { required: false, trim: true, type: String, select: true },
        type: { required: false, trim: true, type: String, select: true }
    })),
    __metadata("design:type", Object)
], SellerInfo.prototype, "identity_card", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], SellerInfo.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], SellerInfo.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], SellerInfo.prototype, "phone_number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], SellerInfo.prototype, "register_number", void 0);
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
], SellerInfo.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], SellerInfo.prototype, "product_nature", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], SellerInfo.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now, expires: 86400 }),
    __metadata("design:type", Date)
], SellerInfo.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now, expires: 86400 }),
    __metadata("design:type", Date)
], SellerInfo.prototype, "updated_at", void 0);
SellerInfo = __decorate([
    (0, mongoose_1.Schema)()
], SellerInfo);
exports.SellerInfo = SellerInfo;
exports.SellerInfoSchema = mongoose_1.SchemaFactory.createForClass(SellerInfo);
//# sourceMappingURL=seller-info.entity.js.map