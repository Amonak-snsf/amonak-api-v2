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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const message_entity_1 = require("./entities/message.entity");
const user_entity_1 = require("../users/entities/user.entity");
let MessagesService = class MessagesService {
    constructor(messageModel, userModel) {
        this.messageModel = messageModel;
        this.userModel = userModel;
    }
    async create(createMessageDto) {
        const data = await (0, query_1.create)(this.messageModel, createMessageDto, 'to', (0, helpers_1.userDataPopulateWithTopten)());
        return data;
    }
    async findAll(params) {
        let query;
        let distinctMessage = [];
        if (params.status) {
            query = { status: params.status };
        }
        if (params.notRead) {
            query = Object.assign(Object.assign({}, query), { readAt: { '$exists': false } });
        }
        const order = (params.distinct && params.from) ? -1 : 1;
        if (params.userConnectIsNotTheCreator && params.distinct && params.from) {
            return this.findUserNotReadMessagesForNotifications(params, query, order);
        }
        if (params.to && params.notRead) {
            return this.findUserNotReadMessagesForCount(params, query, order);
        }
        if (params.to && params.from && params.to !== 'undefined' && params.from !== 'undefined') {
            query = Object.assign(Object.assign({}, query), { $or: [{ from: params.from, to: params.to }, { from: params.to, to: params.from }] });
            if (!params.distinct)
                return this.findUsersInboxMessages(params, query, order);
        }
        if (params.distinct && params.from && params.from !== 'undefined' && !params.userConnectIsNotTheCreator) {
            distinctMessage = await this.findAllDistinct(params);
            query = Object.assign(Object.assign({}, query), { _id: { '$in': distinctMessage } });
        }
        return this.findUsersListWithLastMessage(params, query, order);
    }
    async findUsersListWithLastMessage(params, queryFromParent, order) {
        let query = {};
        let filterMessage = [];
        query = queryFromParent;
        let newValue = {};
        const data = await (0, query_1.all)(this.messageModel, query, null, { _id: order }, params.limit, 'to', (0, helpers_1.userDataPopulateWithTopten)());
        for (const value of data) {
            const user = await (0, query_1.one)(this.userModel, { _id: value.from });
            newValue = value;
            newValue['from'] = user;
            filterMessage.push(newValue);
        }
        return filterMessage;
    }
    async findUsersInboxMessages(params, queryFromParent, order) {
        let query = {};
        query = queryFromParent;
        const data = await (0, query_1.all)(this.messageModel, query, null, { _id: order }, params.limit, 'to', (0, helpers_1.userDataPopulateWithTopten)());
        return data;
    }
    async findUserNotReadMessagesForNotifications(params, queryFromParent, order) {
        let query = {};
        let filterMessage = [];
        let newValue = {};
        if (params.userConnectIsNotTheCreator) {
            query = Object.assign(Object.assign({}, queryFromParent), { to: params.from });
        }
        const data = await (0, query_1.all)(this.messageModel, query, null, { _id: order }, params.limit, 'to', (0, helpers_1.userDataPopulateWithTopten)());
        for (const value of data) {
            const filter = filterMessage.find(message => `${message.from._id}` === `${value.from._id}`);
            const user = await (0, query_1.one)(this.userModel, { _id: value.from });
            newValue = value;
            newValue['from'] = user;
            if (!filter)
                filterMessage.push(newValue);
        }
        return filterMessage;
    }
    async findUserNotReadMessagesForCount(params, queryFromParent, order) {
        let query = {};
        query = Object.assign(Object.assign({}, queryFromParent), { to: params.to });
        const data = await (0, query_1.all)(this.messageModel, query, null, { _id: order }, params.limit, 'to', (0, helpers_1.userDataPopulateWithTopten)());
        return data;
    }
    async getLastMessagesOfLastConversations(query, userId, limit) {
        const user_id = new mongoose_2.default.Types.ObjectId(userId);
        const lastConversations = await this.messageModel.aggregate([
            {
                $match: Object.assign(Object.assign({}, query), { '$or': [{ from: user_id }, { to: user_id }] }),
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ['$from', user_id] },
                            then: '$to',
                            else: '$from',
                        },
                    },
                    message: {
                        $first: '$$ROOT',
                    },
                },
            },
            {
                $sort: {
                    'message.createdAt': -1,
                },
            },
            {
                '$limit': limit,
            },
        ]);
        return lastConversations;
    }
    async findAllDistinct(params) {
        var _a;
        let query;
        const messagesId = [];
        if (params.notRead) {
            query = Object.assign(Object.assign({}, query), { readAt: { '$exists': false } });
        }
        const messages = await this.getLastMessagesOfLastConversations(query, params.from, params.limit ? parseInt(params.limit) : 50);
        for (const message of messages) {
            if ((_a = message === null || message === void 0 ? void 0 : message.message) === null || _a === void 0 ? void 0 : _a._id)
                messagesId.push(message.message._id);
        }
        return messagesId;
    }
    async findOne(_id) {
        const data = await (0, query_1.one)(this.messageModel, { _id: _id });
        return data;
    }
    async update(_id, updateMessageDto) {
        let data;
        if (updateMessageDto.readAt && updateMessageDto.from && updateMessageDto.to) {
            let query = { readAt: { '$exists': false }, from: new mongoose_2.default.Types.ObjectId(updateMessageDto.from), to: new mongoose_2.default.Types.ObjectId(updateMessageDto.to) };
            const allNotReadMessages = await (0, query_1.all)(this.messageModel, query);
            for (let value of allNotReadMessages) {
                await (0, query_1.put)(this.messageModel, { readAt: new Date() }, { _id: value._id });
            }
        }
        if (updateMessageDto.deleters) {
            updateMessageDto.deleters = Array.isArray(updateMessageDto.deleters) ? updateMessageDto.deleters : [updateMessageDto.deleters];
            data = await (0, query_1.put)(this.messageModel, updateMessageDto, { _id: _id });
        }
        if (!updateMessageDto.readAt || (updateMessageDto.readAt && !updateMessageDto.from && !updateMessageDto.to)) {
            data = await (0, query_1.put)(this.messageModel, updateMessageDto, { _id: _id });
        }
        return data;
    }
    async remove(_id) {
        const data = await (0, query_1.destroy)(this.messageModel, { _id: _id });
        return data;
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_entity_1.Message.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map