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
exports.PublicationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const products_service_1 = require("../products/products.service");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const publication_type_dto_1 = require("./dto/publication-type.dto");
const publication_entity_1 = require("./entities/publication.entity");
let PublicationsService = class PublicationsService {
    constructor(publicationModel, productService) {
        this.publicationModel = publicationModel;
        this.productService = productService;
    }
    async create(body, res) {
        if (body.type == publication_type_dto_1.PublicationType.sale) {
            const product = await this.productService.create((0, helpers_1.saleBody)(Object.assign(Object.assign({}, body), { from: 'publication' })), res);
            body.product = product._id;
        }
        const data = await (0, query_1.create)(this.publicationModel, body, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(params, res) {
        if (params.search) {
            params = { status: true, content: { $regex: new RegExp(params.search, 'i') } };
        }
        const data = (0, query_1.all)(this.publicationModel, params, null, { createdAt: -1 }, params.limit, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(_id, res) {
        const data = await (0, query_1.one)(this.publicationModel, { _id: _id }, null, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(_id, body, res) {
        const data = await (0, query_1.put)(this.publicationModel, body, { _id: _id }, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(_id, res) {
        const data = await (0, query_1.destroy)(this.publicationModel, { _id: _id });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
PublicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(publication_entity_1.Publication.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        products_service_1.ProductsService])
], PublicationsService);
exports.PublicationsService = PublicationsService;
//# sourceMappingURL=publications.service.js.map