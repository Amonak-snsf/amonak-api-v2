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
exports.BiographiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const biography_entity_1 = require("./entities/biography.entity");
let BiographiesService = class BiographiesService {
    constructor(biographyModel) {
        this.biographyModel = biographyModel;
    }
    async findOne(user_id, res) {
        const biography = await (0, query_1.one)(this.biographyModel, { user_id: user_id });
        return res.status(common_1.HttpStatus.OK).json(biography);
    }
    async update(user_id, upDto, res) {
        const body = (0, helpers_1.update_biography_body)(upDto);
        const biography = await (0, query_1.put)(this.biographyModel, body, { user_id: user_id });
        return res.status(common_1.HttpStatus.OK).json(biography);
    }
};
BiographiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(biography_entity_1.Biography.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BiographiesService);
exports.BiographiesService = BiographiesService;
//# sourceMappingURL=biographies.service.js.map