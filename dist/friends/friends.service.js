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
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mail_service_1 = require("../mail/mail.service");
const user_entity_1 = require("../users/entities/user.entity");
const query_1 = require("../utils/query");
const status_friend_dto_1 = require("./dto/status-friend.dto");
const friend_entity_1 = require("./entities/friend.entity");
let FriendsService = class FriendsService {
    constructor(friendModel, userModel, configService, mailService) {
        this.friendModel = friendModel;
        this.userModel = userModel;
        this.configService = configService;
        this.mailService = mailService;
    }
    async send(cfDto, res) {
        const query1 = [{ from: cfDto.from, to: cfDto.to }, { from: cfDto.to, to: cfDto.from }];
        const friend = await (0, query_1.one)(this.friendModel, { $or: query1 });
        if (friend) {
            return res.status(common_1.HttpStatus.NOT_ACCEPTABLE).json({ message: 'This friendship request already exist !' });
        }
        const from_request = await new this.friendModel({
            from: cfDto.from,
            to: cfDto.to,
            status: status_friend_dto_1.Status.requested
        }).save();
        if (from_request) {
            this.to_request = await new this.friendModel({
                from: cfDto.to,
                to: cfDto.from,
                status: status_friend_dto_1.Status.pending
            }).save();
        }
        if (this.to_request) {
            const query1 = { status: true, $push: { friends: from_request._id } };
            this.user = await (0, query_1.put)(this.userModel, query1, { _id: cfDto.from });
        }
        if (this.user) {
            const query2 = { status: true, $push: { friends: this.to_request._id } };
            this.friend = await await (0, query_1.put)(this.userModel, query2, { _id: cfDto.to });
        }
        if (this.friend) {
            return res.status(common_1.HttpStatus.OK).json({ message: 'friendship request send with success !' });
        }
        return res.status(common_1.HttpStatus.NOT_ACCEPTABLE).json({ message: 'friendship request failed !' });
    }
    async reject(cfDto, res) {
        const query1 = { from: cfDto.from, to: cfDto.to };
        const user = await (0, query_1.put)(this.friendModel, { status: status_friend_dto_1.Status.reject }, query1);
        if (user) {
            const query2 = { from: cfDto.to, to: cfDto.from };
            this.friend = await (0, query_1.put)(this.friendModel, { status: status_friend_dto_1.Status.reject }, query2);
        }
        if (this.friend) {
            const query1 = { status: true, $pull: { friends: user.__id } };
            this.user = await (0, query_1.put)(this.userModel, query1, { _id: cfDto.from });
        }
        if (this.user) {
            const query2 = { status: true, $pull: { friends: this.friend.__id } };
            this.to_request = await (0, query_1.put)(this.userModel, query2, { _id: cfDto.to });
        }
        if (this.to_request) {
            return res.status(common_1.HttpStatus.OK).json({ message: 'friend reject request is done with success !' });
        }
        return res.status(common_1.HttpStatus.NOT_ACCEPTABLE).json({ message: 'friend reject request failed !' });
    }
    async accept(cfDto, res) {
        const query1 = { from: cfDto.from, to: cfDto.to };
        const user = await (0, query_1.put)(this.friendModel, { status: status_friend_dto_1.Status.friends }, query1);
        if (user) {
            const query2 = { from: cfDto.to, to: cfDto.from };
            this.friend = await (0, query_1.put)(this.friendModel, { status: status_friend_dto_1.Status.friends }, query2);
        }
        if (this.friend) {
            return await res.status(common_1.HttpStatus.OK).json({ message: 'friend accept request is done with success !' });
        }
        return res.status(common_1.HttpStatus.NOT_ACCEPTABLE).json({ message: 'friend accept request failed !' });
    }
    async block(cfDto, res) {
        const query1 = { from: cfDto.from, to: cfDto.to };
        const user = await (0, query_1.put)(this.friendModel, { status: status_friend_dto_1.Status.block }, query1);
        if (user) {
            const query2 = { from: cfDto.to, to: cfDto.from };
            this.friend = await (0, query_1.put)(this.friendModel, { status: status_friend_dto_1.Status.block }, query2);
        }
        if (this.friend) {
            return await res.status(common_1.HttpStatus.OK).json({ message: 'friend block request is done with success !' });
        }
        return res.status(common_1.HttpStatus.NOT_ACCEPTABLE).json({ message: 'friend block request failed !' });
    }
};
FriendsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(friend_entity_1.Friend.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService, mail_service_1.MailService])
], FriendsService);
exports.FriendsService = FriendsService;
//# sourceMappingURL=friends.service.js.map