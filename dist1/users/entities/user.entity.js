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
const mongoose = require("@nestjs/mongoose");
const class_transformer = require("class-transformer");
const mongoose = require("mongoose");
const default_model = require("../../utils/default-model");
const user_accountType_enum = require("../dto/user-account-type.enum");
let User = class User extends default_model.DefaultModel {
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
};
__decorate([
    (0, class_transformer.Expose)(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], User.prototype, "fullName", null);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: String, uppercase: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, trim: true, type: String, unique: true, lowercase: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, class_transformer.Exclude)(),
    (0, mongoose.Prop)({ required: true, trim: true, type: String, select: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "dialCode", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, trim: true, type: String, default: 'M' }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: Date }),
    __metadata("design:type", String)
], User.prototype, "birthDay", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "birthPlace", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "profession", void 0);
__decorate([
    (0, mongoose.Prop)([String]),
    __metadata("design:type", Array)
], User.prototype, "sectors", void 0);
__decorate([
    (0, mongoose.Prop)((0, mongoose.raw)({
        countryName: { required: false, trim: true, type: String },
        countryCode: { required: false, trim: true, type: String },
        state: { required: false, trim: true, type: String },
        city: { required: false, trim: true, type: String },
        postalCode: { required: false, trim: true, type: String },
        street: { required: false, trim: true, type: String },
        fullAddress: { required: false, trim: true, type: String }
    })),
    __metadata("design:type", Object)
], User.prototype, "address", void 0);
__decorate([
    (0, mongoose.Prop)((0, mongoose.raw)({
        number: { required: false, trim: true, type: String, select: false },
        cvc: { required: false, trim: true, type: String, select: false },
        zip: { required: false, trim: true, type: String, select: false },
        address: { required: false, trim: true, type: String }
    })),
    __metadata("design:type", Object)
], User.prototype, "bankCard", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }] }),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: String, default: user_accountType_enum.AccountType.default }),
    __metadata("design:type", String)
], User.prototype, "accountType", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isLog", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isFirstTime", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isNewFeed", void 0);
User = __decorate([
    (0, mongoose.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.entity.js.map