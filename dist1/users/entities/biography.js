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
exports.BiographySchema = exports.Biography = void 0;
const mongoose = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_entity = require("./user.entity");
let Biography = class Biography {
};
__decorate([
    (0, mongoose.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity.User)
], Biography.prototype, "user", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Biography.prototype, "relationShip", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }),
    __metadata("design:type", Array)
], Biography.prototype, "familyMember", void 0);
__decorate([
    (0, mongoose.Prop)([String]),
    __metadata("design:type", Array)
], Biography.prototype, "nickname", void 0);
__decorate([
    (0, mongoose.Prop)([String]),
    __metadata("design:type", Array)
], Biography.prototype, "interestedBy", void 0);
__decorate([
    (0, mongoose.Prop)([String]),
    __metadata("design:type", Array)
], Biography.prototype, "politics", void 0);
__decorate([
    (0, mongoose.Prop)([String]),
    __metadata("design:type", Array)
], Biography.prototype, "confessions", void 0);
__decorate([
    (0, mongoose.Prop)([String]),
    __metadata("design:type", Array)
], Biography.prototype, "languages", void 0);
__decorate([
    (0, mongoose.Prop)([String]),
    __metadata("design:type", Array)
], Biography.prototype, "webSites", void 0);
__decorate([
    (0, mongoose.Prop)([String]),
    __metadata("design:type", Array)
], Biography.prototype, "networks", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, trim: true, type: String, default: 'Public' }),
    __metadata("design:type", String)
], Biography.prototype, "status", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, default: Date.now }),
    __metadata("design:type", Date)
], Biography.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, default: Date.now }),
    __metadata("design:type", Date)
], Biography.prototype, "updatedAt", void 0);
Biography = __decorate([
    (0, mongoose.Schema)()
], Biography);
exports.Biography = Biography;
exports.BiographySchema = mongoose.SchemaFactory.createForClass(Biography);
//# sourceMappingURL=biography.js.map