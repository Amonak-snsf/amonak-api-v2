"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationManagementsModule = void 0;
const common = require("@nestjs/common");
const publication_managements_service = require("./publication-managements.service");
const publication_managements_controller = require("./publication-managements.controller");
const mongoose = require("@nestjs/mongoose");
const publication_management_entity = require("./entities/publication-management.entity");
let PublicationManagementsModule = class PublicationManagementsModule {
};
PublicationManagementsModule = __decorate([
    (0, common.Module)({
        imports: [
            mongoose.MongooseModule.forFeature([{ name: publication_management_entity.PublicationManagement.name, schema: publication_management_entity.PubManagementSchema }])
        ],
        controllers: [publication_managements_controller.PublicationManagementsController],
        providers: [publication_managements_service.PublicationManagementsService]
    })
], PublicationManagementsModule);
exports.PublicationManagementsModule = PublicationManagementsModule;
//# sourceMappingURL=publication-managements.module.js.map