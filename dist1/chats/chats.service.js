"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsService = void 0;
const common = require("@nestjs/common");
let ChatsService = class ChatsService {
    create(createChatDto) {
        return 'This action adds a new chat';
    }
    findAll() {
        return `This action returns all chats`;
    }
    findOne(_id) {
        return `This action returns a #${_id} chat`;
    }
    update(_id, updateChatDto) {
        return `This action updates a #${_id} chat`;
    }
    remove(_id) {
        return `This action removes a #${_id} chat`;
    }
};
ChatsService = __decorate([
    (0, common.Injectable)()
], ChatsService);
exports.ChatsService = ChatsService;
//# sourceMappingURL=chats.service.js.map