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
exports.PublicationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const publication_managements_type_dto_1 = require("../publication-managements/dto/publication-managements-type.dto");
const publications_service_1 = require("./publications.service");
let PublicationGateway = class PublicationGateway {
    constructor(publicationService) {
        this.publicationService = publicationService;
    }
    async newPublication(client, newPublication) {
        if (newPublication.type === 'desktop') {
            this.server.emit("newPublicationListener", newPublication.data);
        }
        if (newPublication.type === 'mobile') {
            client.broadcast.emit("newPublicationListener", newPublication.data);
        }
        if (newPublication.data.share && newPublication.data.share !== '') {
            this.server.emit('updatePublicationShareStatistiqueListener', newPublication.data);
        }
        console.log("form client publication id after create it", newPublication.data._id, newPublication.type);
    }
    async softDeletePublicationEvent(client, softDeletePublication) {
        if (softDeletePublication.type === publication_managements_type_dto_1.PubManagementType.softDeleteAll) {
            this.server.emit("softDeletePublicationListener", softDeletePublication.data);
            this.publicationService.update(softDeletePublication.data._id, { status: false });
            console.log(softDeletePublication.type);
        }
        if (softDeletePublication.type === publication_managements_type_dto_1.PubManagementType.softDelete) {
            console.log(softDeletePublication.type);
            client.emit("softDeletePublicationListener", softDeletePublication.data);
        }
        console.log("form client publication list after delete one of the list");
    }
    async saveFollowPublicationEvent(client, saveFollowPublication) {
        if (saveFollowPublication.type === publication_managements_type_dto_1.PubManagementType.save) {
            client.emit("saveFollowPublicationListener", saveFollowPublication.data);
            console.log(saveFollowPublication.type);
        }
        if (saveFollowPublication.type === publication_managements_type_dto_1.PubManagementType.follow) {
            console.log(saveFollowPublication.type);
            this.server.emit("saveFollowPublicationListener", saveFollowPublication.data);
        }
        console.log("form client publication list after delete one of the list");
    }
    async likePublicationEvent(client, likePublication) {
        this.server.emit("likePublicationListener", likePublication.data);
        console.log("like publication");
    }
    async updatePublicationEvent(client, updatePublication) {
        this.server.emit("updatePublicationListener", updatePublication);
        console.log("form client publication list after update the list");
    }
    async commentPublication(client, newPublicationComment) {
        let room = newPublicationComment.room;
        if (!Array.isArray(room))
            room = [room];
        this.server.to(room).emit('newPublicationComment', newPublicationComment.data);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PublicationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("newPublicationEvent"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], PublicationGateway.prototype, "newPublication", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("softDeletePublicationEvent"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], PublicationGateway.prototype, "softDeletePublicationEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("saveFollowPublicationEvent"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], PublicationGateway.prototype, "saveFollowPublicationEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("likePublicationEvent"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], PublicationGateway.prototype, "likePublicationEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("updatePublicationEvent"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], PublicationGateway.prototype, "updatePublicationEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("commentPublication"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], PublicationGateway.prototype, "commentPublication", null);
PublicationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true, path: "/amonak-api", namespace: "api/publication" }),
    __metadata("design:paramtypes", [publications_service_1.PublicationsService])
], PublicationGateway);
exports.PublicationGateway = PublicationGateway;
//# sourceMappingURL=publication.gateway.js.map