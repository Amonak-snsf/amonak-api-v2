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
exports.NewsletterSchema = exports.Newsletter = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const default_model_1 = require("../../utils/default-model");
const newsletter_type_dto_1 = require("./newsletter-type.dto");
let Newsletter = class Newsletter extends default_model_1.DefaultModel {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, trim: true, lowercase: true }),
    __metadata("design:type", String)
], Newsletter.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String, trim: true }),
    __metadata("design:type", String)
], Newsletter.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String, trim: true }),
    __metadata("design:type", String)
], Newsletter.prototype, "fullAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String, trim: true }),
    __metadata("design:type", String)
], Newsletter.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String, trim: true }),
    __metadata("design:type", String)
], Newsletter.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, trim: true, default: newsletter_type_dto_1.ContactType.newsletter }),
    __metadata("design:type", String)
], Newsletter.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Newsletter.prototype, "status", void 0);
Newsletter = __decorate([
    (0, mongoose_1.Schema)()
], Newsletter);
exports.Newsletter = Newsletter;
exports.NewsletterSchema = mongoose_1.SchemaFactory.createForClass(Newsletter);
//# sourceMappingURL=newsletter.entity.js.map