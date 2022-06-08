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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll(params, res) {
        if (params.search) {
            params = { status: true, $or: [{ userName: { $regex: new RegExp(params.search, 'i') } }, { email: { $regex: new RegExp(params.search, 'i') } }, { firstName: { $regex: new RegExp(params.search, 'i') } }, { lastName: { $regex: new RegExp(params.search, 'i') } }] };
        }
        if (params.followers) {
            params = { '$in': params.followers };
        }
        const data = await (0, query_1.all)(this.userModel, params, null, { _id: -1 }, params.limit, null, null);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(_id, res) {
        const data = await (0, query_1.one)(this.userModel, { _id: _id });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(_id, upDto, file, res) {
        const user = await (0, query_1.exist)(this.userModel, { _id: _id });
        delete upDto.friends;
        this.data = upDto;
        if (file && file.path) {
            this.data.avatar = `/${file.path}`;
        }
        const bankCard = (0, helpers_1.CustomBankCard)(upDto.bankCard);
        const address = (0, helpers_1.userAddress)(upDto.address);
        if (bankCard) {
            this.data.bankCard = bankCard;
        }
        if (address) {
            this.data.address = address;
        }
        this.data.sectors = Array.isArray(upDto.sectors) ? upDto.sectors : [upDto.sectors];
        if (user.sectors) {
            console.log(user.sectors);
            user.sectors.forEach(sector => {
                if (sector)
                    this.data.sectors.push(sector);
            });
        }
        const data = await (0, query_1.put)(this.userModel, this.data, { _id: _id });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(_id, res) {
        const data = await (0, query_1.destroy)(this.userModel, { _id: _id });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map