"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common = require("@nestjs/common");
const mongoose = require("@nestjs/mongoose");
const users_service = require("./users.service");
const users_controller = require("./users.controller");
const user_entity = require("./entities/user.entity");
const config = require("@nestjs/config");
const friend_entity = require("../friends/entities/friend.entity");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common.Module)({
        imports: [mongoose.MongooseModule.forFeature([{ name: user_entity.User.name, schema: user_entity.UserSchema }, { name: friend_entity.Friend.name, schema: friend_entity.FriendSchema }]),
            config.ConfigModule
        ],
        controllers: [users_controller.UsersController],
        providers: [users_service.UsersService]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map