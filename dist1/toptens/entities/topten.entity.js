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
exports.ToptenSchema = exports.Topten = void 0;
const mongoose = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_entity = require("../../users/entities/user.entity");
const topten_status_interface = require("../dto/topten-status-interface");
const default_model = require("../../utils/default-model");
let Topten = class Topten extends default_model.DefaultModel {
};
__decorate([
    (0, mongoose.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity.User)
], Topten.prototype, "user", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }),
    __metadata("design:type", Array)
], Topten.prototype, "followers", void 0);
__decorate([
    (0, mongoose.Prop)((0, mongoose.raw)({
        url: { required: false, trim: true, type: String, select: true },
        type: { required: false, trim: true, type: String, select: true }
    })),
    __metadata("design:type", Array)
], Topten.prototype, "files", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Topten.prototype, "message", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Topten.prototype, "company", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, trim: true, type: Number }),
    __metadata("design:type", Number)
], Topten.prototype, "duration", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Topten.prototype, "webSites", void 0);
__decorate([
    (0, mongoose.Prop)({ type: String }),
    __metadata("design:type", String)
], Topten.prototype, "name", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Topten.prototype, "price", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, enum: topten_status_interface.Status, default: 'disabled' }),
    __metadata("design:type", String)
], Topten.prototype, "status", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, default: 2 }),
    __metadata("design:type", Number)
], Topten.prototype, "endAt", void 0);
Topten = __decorate([
    (0, mongoose.Schema)()
], Topten);
exports.Topten = Topten;
exports.ToptenSchema = mongoose.SchemaFactory.createForClass(Topten);
//# sourceMappingURL=topten.entity.js.map