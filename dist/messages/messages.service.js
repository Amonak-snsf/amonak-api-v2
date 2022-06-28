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
        let filterMessage = [];
        let distinctMessage = [];
        if (params.to && params.from && params.to !== 'undefined' && params.from !== 'undefined') {
            query = { $or: [{ from: params.from, to: params.to }, { from: params.to, to: params.from }] };
        }
        if (params.distinct && params.from && params.from !== 'undefined') {
            distinctMessage = await this.findAllDistinct(params);
            query = { $or: [{ to: { '$nin': distinctMessage } }, { from: { '$nin': distinctMessage } }] };
        }
        if (params.status) {
            query = Object.assign(Object.assign({}, query), { status: params.status });
        }
        if (params.notRead) {
            query = Object.assign(Object.assign({}, query), { readAt: { '$exists': false } });
        }
        const data = await (0, query_1.all)(this.messageModel, query, null, { _id: -1 }, params.limit, 'to', (0, helpers_1.userDataPopulateWithTopten)());
        if (params.distinct && params.from) {
            let newValue = {};
            for (const value of data) {
                if (distinctMessage.includes(`${value.from}`) || distinctMessage.includes(`${value.to._id}`)) {
                    const filter = filterMessage.find(message => {
                        return ((`${message.from._id}` === `${value.from}`) || (`${message.to._id}` === `${value.from}`));
                    });
                    const user = await (0, query_1.one)(this.userModel, { _id: value.from });
                    newValue = value;
                    newValue['from'] = user;
                    if (!filter)
                        filterMessage.push(newValue);
                }
            }
        }
        if (params.distinct && params.from) {
            return filterMessage;
        }
        return data;
    }
    async findAllDistinct(params) {
        let query;
        const userList = [];
        if (params.from) {
            query = { $or: [{ from: params.from }, { to: params.from }] };
        }
        const data = await (0, query_1.allDistinct)(this.messageModel, 'to', query);
        if (data && data.length) {
            for (let to of data) {
                if (`${to}` !== params.from) {
                    userList.push(`${to}`);
                }
            }
        }
        return userList;
    }
    async findOne(_id) {
        const data = await (0, query_1.one)(this.messageModel, { _id: _id });
        return data;
    }
    async update(_id, updateMessageDto) {
        let data;
        if (updateMessageDto.readAt) {
            let query = { from: updateMessageDto.from, to: updateMessageDto.to, notRead: true };
            const all = await this.findAll(query);
            for (let value of all) {
                await (0, query_1.put)(this.messageModel, { readAt: new Date() }, { _id: value._id });
                console.log(all.length, query);
            }
        }
        if (updateMessageDto.deleters) {
            updateMessageDto.deleters = Array.isArray(updateMessageDto.deleters) ? updateMessageDto.deleters : [updateMessageDto.deleters];
            data = await (0, query_1.put)(this.messageModel, updateMessageDto, { _id: _id });
        }
        if (!updateMessageDto.readAt) {
            console.log(updateMessageDto);
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