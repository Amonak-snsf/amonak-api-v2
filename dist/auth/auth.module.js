"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const token_entity_1 = require("../users/entities/token.entity");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../users/entities/user.entity");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const biography_entity_1 = require("../biographies/entities/biography.entity");
const seller_info_entity_1 = require("../seller-infos/entities/seller-info.entity");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const jwt_guard_1 = require("./guards/jwt.guard");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: token_entity_1.Token.name, schema: token_entity_1.TokenSchema },
                { name: user_entity_1.User.name, schema: user_entity_1.UserSchema },
                { name: seller_info_entity_1.SellerInfo.name, schema: seller_info_entity_1.SellerInfoSchema },
                { name: biography_entity_1.Biography.name, schema: biography_entity_1.BiographySchema }
            ]),
            config_1.ConfigModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: async (config) => ({
                    secret: config.get('secret'),
                    signOptions: { expiresIn: `${config.get('expire')}s` },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, jwt_guard_1.JwtAuthGuard],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map