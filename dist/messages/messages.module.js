"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("./messages.service");
const messages_controller_1 = require("./messages.controller");
const mongoose_1 = require("@nestjs/mongoose");
const message_entity_1 = require("./entities/message.entity");
const message_gateway_1 = require("./message.gateway");
const friends_module_1 = require("../friends/friends.module");
const user_entity_1 = require("../users/entities/user.entity");
const user_entity_2 = require("../users/entities/user.entity");
let MessagesModule = class MessagesModule {
};
MessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: message_entity_1.Message.name, schema: message_entity_1.MessageSchema },
                { name: user_entity_1.User.name, schema: user_entity_2.UserSchema }]),
            friends_module_1.FriendsModule
        ],
        controllers: [messages_controller_1.MessagesController],
        providers: [messages_service_1.MessagesService, message_gateway_1.MessageGateway],
        exports: [messages_service_1.MessagesService]
    })
], MessagesModule);
exports.MessagesModule = MessagesModule;
//# sourceMappingURL=messages.module.js.map