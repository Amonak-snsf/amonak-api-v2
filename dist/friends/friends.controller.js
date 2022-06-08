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
exports.FriendsController = void 0;
const common_1 = require("@nestjs/common");
const friends_service_1 = require("./friends.service");
const create_friend_dto_1 = require("./dto/create-friend.dto");
const swagger_1 = require("@nestjs/swagger");
let FriendsController = class FriendsController {
    constructor(friendsService) {
        this.friendsService = friendsService;
    }
    send(createFriendDto, res) {
        return this.friendsService.send(createFriendDto, res);
    }
    reject(createFriendDto, res) {
        return this.friendsService.reject(createFriendDto, res);
    }
    accept(createFriendDto, res) {
        return this.friendsService.accept(createFriendDto, res);
    }
    block(createFriendDto, res) {
        return this.friendsService.block(createFriendDto, res);
    }
};
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_friend_dto_1.CreateFriendDto, Object]),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "send", null);
__decorate([
    (0, common_1.Post)('reject'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_friend_dto_1.CreateFriendDto, Object]),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "reject", null);
__decorate([
    (0, common_1.Post)('accept'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_friend_dto_1.CreateFriendDto, Object]),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "accept", null);
__decorate([
    (0, common_1.Post)('block'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_friend_dto_1.CreateFriendDto, Object]),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "block", null);
FriendsController = __decorate([
    (0, swagger_1.ApiTags)('friends'),
    (0, swagger_1.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common_1.Controller)('api/friends'),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], FriendsController);
exports.FriendsController = FriendsController;
//# sourceMappingURL=friends.controller.js.map