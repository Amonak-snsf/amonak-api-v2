"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common = require("@nestjs/common");
const categories_service = require("./categories.service");
const categories_controller = require("./categories.controller");
const mongoose = require("@nestjs/mongoose");
const category_entity = require("./entities/category.entity");
let CategoriesModule = class CategoriesModule {
};
CategoriesModule = __decorate([
    (0, common.Module)({
        imports: [
            mongoose.MongooseModule.forFeature([{ name: category_entity.Category.name, schema: category_entity.CategorySchema }]),
        ],
        controllers: [categories_controller.CategoriesController],
        providers: [categories_service.CategoriesService]
    })
], CategoriesModule);
exports.CategoriesModule = CategoriesModule;
//# sourceMappingURL=categories.module.js.map