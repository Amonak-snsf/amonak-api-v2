"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerInfosModule = void 0;
const common = require("@nestjs/common");
const seller_infos_service = require("./seller-infos.service");
const seller_infos_controller = require("./seller-infos.controller");
const seller_info_entity = require("./entities/seller-info.entity");
const mongoose = require("@nestjs/mongoose");
const config = require("@nestjs/config");
const user_entity = require("../users/entities/user.entity");
const auth_module = require("../auth/auth.module");
let SellerInfosModule = class SellerInfosModule {
};
SellerInfosModule = __decorate([
    (0, common.Module)({
        imports: [mongoose.MongooseModule.forFeature([{ name: seller_info_entity.SellerInfo.name, schema: seller_info_entity.SellerInfoSchema },
                { name: user_entity.User.name, schema: user_entity.UserSchema }
            ]),
            config.ConfigModule,
            auth_module.AuthModule
        ],
        controllers: [seller_infos_controller.SellerInfosController],
        providers: [seller_infos_service.SellerInfosService]
    })
], SellerInfosModule);
exports.SellerInfosModule = SellerInfosModule;
//# sourceMappingURL=seller-infos.module.js.map