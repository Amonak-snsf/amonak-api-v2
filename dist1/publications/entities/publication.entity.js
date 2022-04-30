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
exports.PublicationSchema = exports.Publication = void 0;
const mongoose = require("@nestjs/mongoose");
const class_validator = require("class-validator");
const mongoose = require("mongoose");
const product_entity = require("../../products/entities/product.entity");
const user_entity = require("../../users/entities/user.entity");
const default_model = require("../../utils/default-model");
const publication_type_dto = require("../dto/publication-type.dto");
let Publication = class Publication extends default_model.DefaultModel {
};
__decorate([
    (0, mongoose.Prop)({ required: false, type: String, trim: true }),
    __metadata("design:type", String)
], Publication.prototype, "content", void 0);
__decorate([
    (0, mongoose.Prop)((0, mongoose.raw)({
        url: { required: false, trim: true, type: String, select: true },
        type: { required: false, trim: true, type: String, select: true }
    })),
    __metadata("design:type", Array)
], Publication.prototype, "files", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Product' }),
    __metadata("design:type", product_entity.Product)
], Publication.prototype, "product", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity.User)
], Publication.prototype, "user", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Publication.prototype, "status", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, type: String, trim: true, default: publication_type_dto.PublicationType.default }),
    (0, class_validator.IsIn)([publication_type_dto.PublicationType.alerte, publication_type_dto.PublicationType.default, publication_type_dto.PublicationType.post, publication_type_dto.PublicationType.publicity, publication_type_dto.PublicationType.sale, publication_type_dto.PublicationType.share]),
    __metadata("design:type", String)
], Publication.prototype, "type", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: String, trim: true }),
    (0, class_validator.IsIn)([publication_type_dto.SaleType.default]),
    __metadata("design:type", String)
], Publication.prototype, "saleType", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: String, trim: true }),
    __metadata("design:type", String)
], Publication.prototype, "alerteName", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: String, trim: true }),
    (0, class_validator.IsIn)([publication_type_dto.AlerteType.default]),
    __metadata("design:type", String)
], Publication.prototype, "alerteType", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: String, trim: true }),
    __metadata("design:type", String)
], Publication.prototype, "alerteDuration", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: String, trim: true }),
    __metadata("design:type", String)
], Publication.prototype, "publicity", void 0);
Publication = __decorate([
    (0, mongoose.Schema)()
], Publication);
exports.Publication = Publication;
exports.PublicationSchema = mongoose.SchemaFactory.createForClass(Publication);
//# sourceMappingURL=publication.entity.js.map