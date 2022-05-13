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
const create_auth_dto_1 = require("./dto/create-auth.dto");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../users/entities/user.entity");
const mongoose_2 = require("mongoose");
const query_1 = require("../utils/query");
let AuthsGateway = class AuthsGateway {
    constructor(userModel) {
        this.userModel = userModel;
    }
    afterInit() {
        console.log("server socket.io server init");
    }
    handleConnection(client, ...args) {
        client.on('client', (data) => {
            console.log(data, ' client id: ' + client.id);
            this.disconnected(client, true);
            client.emit('server', 'server socket is started');
        });
    }
    handleDisconnect(client) {
        this.disconnected(client, false);
        console.log(`socket.io disconnected ${client.handshake.headers.authorization}`, client.handshake.headers.userid);
    }
    create(createAuthDto, client) {
        this.server.emit('login', { username: "bestman", password: client.handshake.headers });
    }
    async disconnected(client, status) {
        const userId = client.handshake.headers.userid ? client.handshake.headers.userid.toString() : '';
        if (userId) {
            await (0, query_1.put)(this.userModel, { isLog: status }, { _id: userId });
            return true;
        }
        return false;
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AuthsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('loginRequest'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AuthsGateway.prototype, "create", null);
AuthsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true, path: '/amonak-api', namespace: 'api/auth' }),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthsGateway);
exports.AuthsGateway = AuthsGateway;
//# sourceMappingURL=auths.gateway.js.map