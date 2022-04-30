"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationsModule = void 0;
const common = require("@nestjs/common");
const publications_service = require("./publications.service");
const publications_controller = require("./publications.controller");
const mongoose = require("@nestjs/mongoose");
const publication_entity = require("./entities/publication.entity");
const products_module = require("../products/products.module");
let PublicationsModule = class PublicationsModule {
};
PublicationsModule = __decorate([
    (0, common.Module)({
        imports: [mongoose.MongooseModule.forFeature([{ name: publication_entity.Publication.name, schema: publication_entity.PublicationSchema }]),
            products_module.ProductsModule
        ],
        controllers: [publications_controller.PublicationsController],
        providers: [publications_service.PublicationsService]
    })
], PublicationsModule);
exports.PublicationsModule = PublicationsModule;
//# sourceMappingURL=publications.module.js.map