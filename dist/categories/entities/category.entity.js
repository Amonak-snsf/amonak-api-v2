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
exports.CategorySchema = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const default_model_1 = require("../../utils/default-model");
let Category = class Category extends default_model_1.DefaultModel {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true, unique: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false, trim: true }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        (0, mongoose_1.raw)({
            destination: { required: false, trim: true, type: String, select: true },
            type: { required: false, trim: true, type: String, select: true },
            extension: { required: false, trim: true, type: String, select: true },
            originalname: { required: false, trim: true, type: String, select: true },
            filename: { required: false, trim: true, type: String, select: true },
            size: { required: false, trim: true, type: Number, select: true },
            url: { required: false, trim: true, type: String, select: true },
        })
    ]),
    __metadata("design:type", Array)
], Category.prototype, "files", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, required: true, default: false }),
    __metadata("design:type", Boolean)
], Category.prototype, "status", void 0);
Category = __decorate([
    (0, mongoose_1.Schema)()
], Category);
exports.Category = Category;
exports.CategorySchema = mongoose_1.SchemaFactory.createForClass(Category);
//# sourceMappingURL=category.entity.js.map