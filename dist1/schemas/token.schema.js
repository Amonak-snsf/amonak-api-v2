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
exports.CatSchema = exports.Cat = void 0;
const mongoose = require("@nestjs/mongoose");
let Cat = class Cat {
};
__decorate([
    (0, mongoose.Prop)({ required: true }),
    __metadata("design:type", String)
], Cat.prototype, "token", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, default: Date.now, expires: 86400 }),
    __metadata("design:type", Date)
], Cat.prototype, "createdAt", void 0);
Cat = __decorate([
    (0, mongoose.Schema)()
], Cat);
exports.Cat = Cat;
exports.CatSchema = mongoose.SchemaFactory.createForClass(Cat);
//# sourceMappingURL=token.schema.js.map