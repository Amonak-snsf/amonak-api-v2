"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToptensModule = void 0;
const common = require("@nestjs/common");
const toptens_service = require("./toptens.service");
const toptens_controller = require("./toptens.controller");
const topten_entity = require("./entities/topten.entity");
const mongoose = require("@nestjs/mongoose");
const config = require("@nestjs/config");
const user_entity = require("../users/entities/user.entity");
let ToptensModule = class ToptensModule {
};
ToptensModule = __decorate([
    (0, common.Module)({
        imports: [mongoose.MongooseModule.forFeature([{ name: topten_entity.Topten.name, schema: topten_entity.ToptenSchema }, { name: user_entity.User.name, schema: user_entity.UserSchema }]),
            config.ConfigModule
        ],
        controllers: [toptens_controller.ToptensController],
        providers: [toptens_service.ToptensService]
    })
], ToptensModule);
exports.ToptensModule = ToptensModule;
//# sourceMappingURL=toptens.module.js.map