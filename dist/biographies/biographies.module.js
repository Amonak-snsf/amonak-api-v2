"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiographiesModule = void 0;
const common_1 = require("@nestjs/common");
const biographies_service_1 = require("./biographies.service");
const biographies_controller_1 = require("./biographies.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../users/entities/user.entity");
const config_1 = require("@nestjs/config");
const biography_entity_1 = require("./entities/biography.entity");
let BiographiesModule = class BiographiesModule {
};
BiographiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_entity_1.User.name, schema: user_entity_1.UserSchema },
                { name: biography_entity_1.Biography.name, schema: biography_entity_1.BiographySchema },
            ]),
            config_1.ConfigModule,
        ],
        controllers: [biographies_controller_1.BiographiesController],
        providers: [biographies_service_1.BiographiesService],
    })
], BiographiesModule);
exports.BiographiesModule = BiographiesModule;
//# sourceMappingURL=biographies.module.js.map