"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiographiesModule = void 0;
const common = require("@nestjs/common");
const biographies_service = require("./biographies.service");
const biographies_controller = require("./biographies.controller");
const mongoose = require("@nestjs/mongoose");
const user_entity = require("../users/entities/user.entity");
const config = require("@nestjs/config");
const biography_entity = require("./entities/biography.entity");
let BiographiesModule = class BiographiesModule {
};
BiographiesModule = __decorate([
    (0, common.Module)({
        imports: [mongoose.MongooseModule.forFeature([{ name: user_entity.User.name, schema: user_entity.UserSchema }, { name: biography_entity.Biography.name, schema: biography_entity.BiographySchema }]),
            config.ConfigModule
        ],
        controllers: [biographies_controller.BiographiesController],
        providers: [biographies_service.BiographiesService]
    })
], BiographiesModule);
exports.BiographiesModule = BiographiesModule;
//# sourceMappingURL=biographies.module.js.map