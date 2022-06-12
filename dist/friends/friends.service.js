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
exports.FriendsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const query_1 = require("../utils/query");
const status_friend_dto_1 = require("./dto/status-friend.dto");
const friend_entity_1 = require("./entities/friend.entity");
let FriendsService = class FriendsService {
    constructor(friendModel) {
        this.friendModel = friendModel;
    }
    async listFriendRequest(user) {
        const userList = [];
        const friends = await (0, query_1.all)(this.friendModel, { to: user, status: status_friend_dto_1.Status.requested });
        if (friends && friends.length) {
            for (let friend of friends) {
                userList.push(friend.from);
            }
        }
        return userList;
    }
    async listFriend(user) {
        const userList = [];
        const query = [{ from: user, status: status_friend_dto_1.Status.friend }, { to: user, status: status_friend_dto_1.Status.friend }];
        const friends = await (0, query_1.all)(this.friendModel, { $or: query });
        if (friends && friends.length) {
            for (let friend of friends) {
                if (`${friend.from}` === user) {
                    userList.push(friend.to);
                }
                if (`${friend.to}` === user) {
                    userList.push(friend.from);
                }
            }
        }
        return userList;
    }
    async listSugestions(user) {
        const userList = [];
        const query = [{ from: user }, { to: user }];
        const friends = await (0, query_1.all)(this.friendModel, { $or: query });
        userList.push(user);
        if (friends && friends.length) {
            for (let friend of friends) {
                if (`${friend.from}` === user) {
                    userList.push(friend.to);
                }
                if (`${friend.to}` === user) {
                    userList.push(friend.from);
                }
            }
        }
        return userList;
    }
    async listUsers(user) {
        const userList = [];
        const query = [{ from: user }, { to: user }];
        const friends = await (0, query_1.all)(this.friendModel, { $or: query });
        userList.push(user);
        if (friends && friends.length) {
            for (let friend of friends) {
                if (`${friend.from}` === user) {
                    userList.push(friend.to);
                }
                if (`${friend.to}` === user) {
                    userList.push(friend.from);
                }
            }
        }
        return userList;
    }
    async send(cfDto, res) {
        const query1 = [{ from: cfDto.from, to: cfDto.to }, { from: cfDto.to, to: cfDto.from }];
        const friend = await (0, query_1.one)(this.friendModel, { $or: query1 });
        if (friend) {
            const query1 = { from: cfDto.from, to: cfDto.to };
            await (0, query_1.put)(this.friendModel, { status: status_friend_dto_1.Status.requested }, query1);
            return res.status(common_1.HttpStatus.OK).json({ message: 'friendship request send with success !' });
        }
        const from_request = await new this.friendModel({
            from: cfDto.from,
            to: cfDto.to,
            status: status_friend_dto_1.Status.requested
        }).save();
        return res.status(common_1.HttpStatus.OK).json({ message: 'friendship request send with success !' });
    }
    async reject(cfDto, res) {
        const query1 = { from: cfDto.from, to: cfDto.to };
        const user = await (0, query_1.put)(this.friendModel, { status: status_friend_dto_1.Status.reject }, query1);
        return res.status(common_1.HttpStatus.OK).json({ message: 'friend reject request is done with success !' });
    }
    async accept(cfDto, res) {
        const query1 = { from: cfDto.from, to: cfDto.to };
        const user = await (0, query_1.put)(this.friendModel, { status: status_friend_dto_1.Status.friend }, query1);
        return await res.status(common_1.HttpStatus.OK).json({ message: 'friend accept request is done with success !' });
    }
    async block(cfDto, res) {
        const query1 = { from: cfDto.from, to: cfDto.to };
        const user = await (0, query_1.put)(this.friendModel, { status: status_friend_dto_1.Status.block }, query1);
        return await res.status(common_1.HttpStatus.OK).json({ message: 'friend block request is done with success !' });
    }
};
FriendsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(friend_entity_1.Friend.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FriendsService);
exports.FriendsService = FriendsService;
//# sourceMappingURL=friends.service.js.map