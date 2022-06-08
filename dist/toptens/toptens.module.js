"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToptensModule = void 0;
const common_1 = require("@nestjs/common");
const toptens_service_1 = require("./toptens.service");
const toptens_controller_1 = require("./toptens.controller");
const topten_entity_1 = require("./entities/topten.entity");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../users/entities/user.entity");
let ToptensModule = class ToptensModule {
};
ToptensModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: topten_entity_1.Topten.name, schema: topten_entity_1.ToptenSchema }, { name: user_entity_1.User.name, schema: user_entity_1.UserSchema }]),
            config_1.ConfigModule
        ],
        controllers: [toptens_controller_1.ToptensController],
        providers: [toptens_service_1.ToptensService]
    })
], ToptensModule);
exports.ToptensModule = ToptensModule;
//# sourceMappingURL=toptens.module.js.map