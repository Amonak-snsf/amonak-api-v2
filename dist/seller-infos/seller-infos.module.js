"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerInfosModule = void 0;
const common_1 = require("@nestjs/common");
const seller_infos_service_1 = require("./seller-infos.service");
const seller_infos_controller_1 = require("./seller-infos.controller");
const seller_info_entity_1 = require("./entities/seller-info.entity");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../users/entities/user.entity");
const auth_module_1 = require("../auth/auth.module");
let SellerInfosModule = class SellerInfosModule {
};
SellerInfosModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: seller_info_entity_1.SellerInfo.name, schema: seller_info_entity_1.SellerInfoSchema },
                { name: user_entity_1.User.name, schema: user_entity_1.UserSchema }
            ]),
            config_1.ConfigModule,
            auth_module_1.AuthModule
        ],
        controllers: [seller_infos_controller_1.SellerInfosController],
        providers: [seller_infos_service_1.SellerInfosService]
    })
], SellerInfosModule);
exports.SellerInfosModule = SellerInfosModule;
//# sourceMappingURL=seller-infos.module.js.map