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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(createProductDto, files, res) {
        const custom_files = (0, helpers_1.customFiles)(files);
        if (custom_files) {
            createProductDto.files = custom_files;
        }
        const address = (0, helpers_1.userAddress)(createProductDto.address);
        if (address) {
            createProductDto.address = address;
        }
        this.data = createProductDto;
        const from = this.data.from;
        delete this.data.from;
        const data = await (0, query_1.create)(this.productModel, this.data, 'user_id', (0, helpers_1.userDataPopulateWithTopten)());
        if (from == 'publication') {
            return data;
        }
        return await res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(params, res) {
        if (params.search) {
            params = { $or: [{ name: { $regex: new RegExp(params.search, 'i') } }, { content: { $regex: new RegExp(params.search, 'i') } }, { price: { $regex: new RegExp(params.search, 'i') } }] };
        }
        const data = await (0, query_1.all)(this.productModel, params, null, { created_at: -1 }, params.limit, 'user_id', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(id, res) {
        const data = await (0, query_1.one)(this.productModel, { _id: id }, null, 'user_id', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(id, updateProductDto, files, res) {
        const custom_files = (0, helpers_1.customFiles)(files);
        if (custom_files) {
            updateProductDto.files = custom_files;
        }
        const address = (0, helpers_1.userAddress)(updateProductDto.address);
        if (address) {
            updateProductDto.address = address;
        }
        const data = await (0, query_1.put)(this.productModel, updateProductDto, { _id: id }, 'user_id', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(id, res) {
        const data = await (0, query_1.destroy)(this.productModel, { _id: id });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map