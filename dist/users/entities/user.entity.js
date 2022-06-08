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
const default_model_1 = require("../../utils/default-model");
const user_account_type_enum_1 = require("../dto/user-account-type.enum");
let User = class User extends default_model_1.DefaultModel {
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
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
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String, uppercase: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
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
], User.prototype, "dialCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String, default: 'M' }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: Date }),
    __metadata("design:type", String)
], User.prototype, "birthDay", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "birthPlace", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        (0, mongoose_1.raw)({
            destination: { required: false, trim: true, type: String },
            type: { required: false, trim: true, type: String },
            extension: { required: false, trim: true, type: String },
            originalname: { required: false, trim: true, type: String },
            filename: { required: false, trim: true, type: String },
            size: { required: false, trim: true, type: Number },
            url: { required: false, trim: true, type: String },
        })
    ]),
    __metadata("design:type", Array)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], User.prototype, "profession", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], User.prototype, "sectors", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], User.prototype, "webSites", void 0);
__decorate([
    (0, mongoose_1.Prop)([(0, mongoose_1.raw)({
            countryName: { required: false, trim: true, type: String },
            countryCode: { required: false, trim: true, type: String },
            state: { required: false, trim: true, type: String },
            city: { required: false, trim: true, type: String },
            postalCode: { required: false, trim: true, type: String },
            street: { required: false, trim: true, type: String },
            fullAddress: { required: false, trim: true, type: String }
        })]),
    __metadata("design:type", Array)
], User.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        number: { required: false, trim: true, type: String },
        cvc: { required: false, trim: true, type: String, select: false },
        zip: { required: false, trim: true, type: String, select: false },
        address: { required: false, trim: true, type: String }
    })),
    __metadata("design:type", Object)
], User.prototype, "bankCard", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }] }),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String, default: user_account_type_enum_1.AccountType.default }),
    __metadata("design:type", String)
], User.prototype, "accountType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isLog", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: Date }),
    __metadata("design:type", Date)
], User.prototype, "lastConnected", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isFirstTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isNewFeed", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.entity.js.map