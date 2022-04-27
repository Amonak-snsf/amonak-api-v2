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
exports.AuthsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const auths_service_1 = require("./auths.service");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const update_auth_dto_1 = require("./dto/update-auth.dto");
let AuthsGateway = class AuthsGateway {
    constructor(authsService) {
        this.authsService = authsService;
    }
    handleConnection(client, ...args) {
        console.log("socket.io connected");
    }
    afterInit(server) {
        console.log("socket.io server init");
    }
    handleDisconnect(client) {
        console.log(`socket.io disconnected${client}`);
    }
    create(createAuthDto) {
        return { event: 'createAuth', data: this.authsService.create(createAuthDto) };
    }
    findAll() {
        return this.authsService.findAll();
    }
    findOne(id) {
        return this.authsService.findOne(id);
    }
    update(updateAuthDto) {
        return this.authsService.update(updateAuthDto.id, updateAuthDto);
    }
    remove(id) {
        return this.authsService.remove(id);
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)('createAuth'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", void 0)
], AuthsGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllAuths'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthsGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findOneAuth'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthsGateway.prototype, "findOne", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateAuth'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_auth_dto_1.UpdateAuthDto]),
    __metadata("design:returntype", void 0)
], AuthsGateway.prototype, "update", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removeAuth'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthsGateway.prototype, "remove", null);
AuthsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [auths_service_1.AuthsService])
], AuthsGateway);
exports.AuthsGateway = AuthsGateway;
//# sourceMappingURL=auths.gateway.js.map