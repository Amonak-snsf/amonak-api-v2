"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationManagementsModule = void 0;
const common_1 = require("@nestjs/common");
const publication_managements_service_1 = require("./publication-managements.service");
const publication_managements_controller_1 = require("./publication-managements.controller");
const mongoose_1 = require("@nestjs/mongoose");
const publication_management_entity_1 = require("./entities/publication-management.entity");
const notifications_module_1 = require("../notifications/notifications.module");
let PublicationManagementsModule = class PublicationManagementsModule {
};
PublicationManagementsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: publication_management_entity_1.PublicationManagement.name, schema: publication_management_entity_1.PubManagementSchema }]),
            notifications_module_1.NotificationsModule
        ],
        controllers: [publication_managements_controller_1.PublicationManagementsController],
        providers: [publication_managements_service_1.PublicationManagementsService],
        exports: [publication_managements_service_1.PublicationManagementsService],
    })
], PublicationManagementsModule);
exports.PublicationManagementsModule = PublicationManagementsModule;
//# sourceMappingURL=publication-managements.module.js.map