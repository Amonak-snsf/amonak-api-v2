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
exports.CartsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const cart_status_dto_1 = require("./dto/cart-status.dto");
const cart_entity_1 = require("./entities/cart.entity");
let CartsService = class CartsService {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    async create(createCartDto, res) {
        this.data = createCartDto;
        const data = await (0, query_1.createIfne)(this.cartModel, this.data, { user: this.data.user, status: cart_status_dto_1.CartStatus.unpaid, isWaiting: true });
        if (this.data.from && this.data.from == 'cart_item') {
            return data;
        }
        res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(params, res) {
        const data = await (0, query_1.all)(this.cartModel, params, null, { createdAt: -1 }, params.limit, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(_id, res) {
        const data = await (0, query_1.one)(this.cartModel, { _id: _id }, null, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(_id, updateCartDto, res) {
        const data = await (0, query_1.put)(this.cartModel, updateCartDto, { _id: _id }, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(_id, res) {
        const data = await (0, query_1.destroy)(this.cartModel, { _id: _id });
        res.status(common_1.HttpStatus.OK).json(data);
    }
};
CartsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_entity_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CartsService);
exports.CartsService = CartsService;
//# sourceMappingURL=carts.service.js.map