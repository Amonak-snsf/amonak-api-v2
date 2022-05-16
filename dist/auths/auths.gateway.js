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
const socket_io_1 = require("socket.io");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../users/entities/user.entity");
const mongoose_2 = require("mongoose");
const query_1 = require("../utils/query");
const jwt_1 = require("@nestjs/jwt");
let AuthsGateway = class AuthsGateway {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    afterInit() {
        console.log("server socket.io server init");
    }
    async handleConnection(client, ...args) {
        const user = await this.user(client);
        client.on('client', (data) => {
            console.log(data, ' client id: ' + client.id);
            this.disconnected(client, true);
            client.emit('server', { message: 'server socket is started', client: client.handshake.headers, auth: user });
        });
    }
    handleDisconnect(client) {
        this.disconnected(client, false);
        console.log(`socket.io disconnected ${client.handshake.headers.authorization}`, client.handshake.headers.userid);
    }
    async disconnected(client, status) {
        const userId = client.handshake.headers.userid ? client.handshake.headers.userid.toString() : '';
        if (userId) {
            await (0, query_1.put)(this.userModel, { isLog: status }, { _id: userId });
            return true;
        }
        return false;
    }
    async auth(client) {
        const user = await this.user(client);
        client.emit('authResponse', user);
    }
    async user(client) {
        let auth = {};
        const userId = client.handshake.headers.userid ? client.handshake.headers.userid.toString() : '';
        let verifyJwt;
        try {
            verifyJwt = this.jwtService.verify(client.handshake.headers.authorization.toString().replace('Bearer ', ''));
        }
        catch (error) {
            console.log('invalid token');
        }
        if (userId && verifyJwt && verifyJwt.email && verifyJwt.iat) {
            auth = await (0, query_1.one)(this.userModel, { _id: userId });
        }
        return auth;
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AuthsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('authRequest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AuthsGateway.prototype, "auth", null);
AuthsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true, path: '/amonak-api', namespace: 'api/auth' }),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, jwt_1.JwtService])
], AuthsGateway);
exports.AuthsGateway = AuthsGateway;
//# sourceMappingURL=auths.gateway.js.map