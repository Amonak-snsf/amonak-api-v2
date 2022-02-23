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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose = require("mongoose");
const user_account_type_enum_1 = require("../dto/user-account-type.enum");
let User = class User {
    get fullName() {
        return `${this.firstname} ${this.lastname}`;
    }
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], User.prototype, "fullName", null);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String, uppercase: true }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String, unique: true, lowercase: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String, select: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "dial_code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String, default: 'M' }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: Date }),
    __metadata("design:type", String)
], User.prototype, "birthday", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "birth_place", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "profession", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], User.prototype, "sectors", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "country_infos", void 0);
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
], User.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        number: { required: false, trim: true, type: String, select: false },
        cvc: { required: false, trim: true, type: String, select: false },
        zip: { required: false, trim: true, type: String, select: false },
        address: { required: false, trim: true, type: String }
    })),
    __metadata("design:type", Object)
], User.prototype, "bank_card", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }] }),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String, default: user_account_type_enum_1.AccountType.default }),
    __metadata("design:type", String)
], User.prototype, "account_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_log", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "is_first_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "is_new_feed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "data", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: Date.now, type: Date }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: Date.now, type: Date }),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.entity.js.map