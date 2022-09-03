"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const friends_service_1 = require("../friends/friends.service");
let MessageGateway = class MessageGateway {
    constructor(friendService) {
        this.friendService = friendService;
    }
    handleMessage(client, payload) {
        return 'Hello world!';
    }
    async joinChatRoom(client, data) {
        const friend = await this.friendService.one(data);
        if (friend) {
            client.join(`${friend._id}`);
            client.emit("joinedChatRoom", `${friend._id}`);
            console.log("join room", `${friend._id}`);
        }
    }
    async leaveChatRoom(client, data) {
        const friend = await this.friendService.one(data);
        if (friend) {
            client.leave(`${friend._id}`);
            client.emit("leftChatRoom", `${friend._id}`);
        }
    }
    async sendMessage(client, data) {
        client.to(data.room).emit('getMessage', data);
    }
    async deleteMessage(client, data) {
        this.server.to(data.room).emit('deleteMessageListener', data);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MessageGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinChatRoom"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "joinChatRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("leaveChatRoom"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "leaveChatRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("sendMessage"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "sendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("deleteMessage"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "deleteMessage", null);
MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true, path: "/amonak-api", namespace: "api/chat" }),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], MessageGateway);
exports.MessageGateway = MessageGateway;
//# sourceMappingURL=message.gateway.js.map