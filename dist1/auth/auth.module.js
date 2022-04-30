"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common = require("@nestjs/common");
const auth_service = require("./auth.service");
const auth_controller = require("./auth.controller");
const token_entity = require("../users/entities/token.entity");
const mongoose = require("@nestjs/mongoose");
const config = require("@nestjs/config");
const user_entity = require("../users/entities/user.entity");
const passport = require("@nestjs/passport");
const jwt = require("@nestjs/jwt");
const biography_entity = require("../biographies/entities/biography.entity");
const seller_info_entity = require("../seller-infos/entities/seller-info.entity");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common.Module)({
        imports: [mongoose.MongooseModule.forFeature([{ name: token_entity.Token.name, schema: token_entity.TokenSchema },
                { name: user_entity.User.name, schema: user_entity.UserSchema },
                { name: seller_info_entity.SellerInfo.name, schema: seller_info_entity.SellerInfoSchema },
                { name: biography_entity.Biography.name, schema: biography_entity.BiographySchema }
            ]),
            config.ConfigModule,
            passport.PassportModule,
            jwt.JwtModule.registerAsync({
                useFactory: async (config) => ({
                    secret: config.get('secret'),
                    signOptions: { expiresIn: `${config.get('expire')}s` },
                }),
                inject: [config.ConfigService],
            }),
        ],
        controllers: [auth_controller.AuthController],
        providers: [auth_service.AuthService],
        exports: [auth_service.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map