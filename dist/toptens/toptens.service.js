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
exports.ToptensService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mail_service_1 = require("../mail/mail.service");
const user_entity_1 = require("../users/entities/user.entity");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const topten_entity_1 = require("./entities/topten.entity");
let ToptensService = class ToptensService {
    constructor(toptenModel, userModel, configService, mailService) {
        this.toptenModel = toptenModel;
        this.userModel = userModel;
        this.configService = configService;
        this.mailService = mailService;
    }
    async create(cTdo, res) {
        this.data = cTdo;
        const d = new Date();
        this.data.end_at = d.setDate(d.getDate() + (parseInt(cTdo.duration, 10) * 7));
        const data = await (0, query_1.create)(this.toptenModel, this.data, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(body, res) {
        const data = await (0, query_1.all)(this.toptenModel, body, null, { _id: -1 }, body.limit, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(_id, res) {
        const data = await (0, query_1.one)(this.toptenModel, { _id: _id }, null, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(_id, updateToptenDto, res) {
        const data = await (0, query_1.put)(this.toptenModel, updateToptenDto, { _id: _id }, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(_id, res) {
        const data = await (0, query_1.destroy)(this.toptenModel, { _id: _id });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
ToptensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(topten_entity_1.Topten.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService, mail_service_1.MailService])
], ToptensService);
exports.ToptensService = ToptensService;
//# sourceMappingURL=toptens.service.js.map