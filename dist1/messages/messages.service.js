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
let MessagesService = class MessagesService {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async create(createMessageDto, files) {
        const custom_files = (0, helpers_1.customFiles)(files);
        if (custom_files) {
            createMessageDto.files = custom_files;
        }
        const data = await (0, query_1.create)(this.messageModel, createMessageDto);
        return data;
    }
    async findAll(params) {
        let query;
        if (params.to) {
            query = { $or: [{ from: params.from, to: params.to }, { from: params.to, to: params.from }] };
        }
        else {
            query = { $or: [{ from: params.from }, { to: params.to }] };
        }
        query = { query, params };
        const data = await (0, query_1.all)(this.messageModel, query, null, { createdAt: -1 }, params.limit);
        return data;
    }
    async findOne(_id) {
        const data = await (0, query_1.one)(this.messageModel, { _id: _id });
        return data;
    }
    async update(_id, updateMessageDto) {
        const data = await (0, query_1.put)(this.messageModel, updateMessageDto, { _id: _id });
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
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map