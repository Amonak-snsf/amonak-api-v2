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
exports.CartItemsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const carts_service_1 = require("../carts/carts.service");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const cart_item_entity_1 = require("./entities/cart-item.entity");
let CartItemsService = class CartItemsService {
    constructor(cartItemModel, cartService) {
        this.cartItemModel = cartItemModel;
        this.cartService = cartService;
    }
    async create(createCartItemDto, res) {
        this.data = Array.isArray(createCartItemDto) ? createCartItemDto : [createCartItemDto];
        const cart = await this.cartService.create({ user_id: this.data[0].user_id, from: 'cart_item' }, res);
        if (cart && cart._id) {
            this.cart_id = cart._id;
        }
        if (cart && cart.message == 'data already exist !') {
            this.cart_id = cart.body._id;
        }
        for (const item of this.data) {
            const data = await (0, query_1.createIfne)(this.cartItemModel, item, { cart_id: this.cart_id, product_id: item.product_id, price: item.price });
            if (data && data.message == 'data already exist !') {
                this.data = null;
                this.data.quantity = data.body.quantity + item.quantity;
                this.data.tax = item.tax ? item.tax : data.body.tax;
                this.data.shipping = item.shipping ? item.shipping : data.body.shipping;
                this.data.percentage = item.percentage ? item.percentage : data.body.percentage;
                await (0, query_1.put)(this.cartItemModel, this.data, { _id: data.body._id });
            }
        }
        const cart_data = await this.findOne(this.cart_id, res);
        await res.status(common_1.HttpStatus.OK).json(cart_data);
    }
    async findAll(params, res) {
        const data = await (0, query_1.all)(this.cartItemModel, params, null, { created_at: -1 }, params.limit, 'product_id');
        res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(cart_id, res) {
        await (0, query_1.one)(this.cartItemModel, { cart_id: cart_id }, null, 'product_id').then(data => {
            res.status(common_1.HttpStatus.OK).json(data.populate('user_id', (0, helpers_1.userDataPopulateWithTopten)()));
        });
    }
    async remove(id, res) {
        const data = await (0, query_1.destroy)(this.cartItemModel, { _id: id });
        res.status(common_1.HttpStatus.OK).json(data);
    }
};
CartItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_item_entity_1.CartItem.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        carts_service_1.CartsService])
], CartItemsService);
exports.CartItemsService = CartItemsService;
//# sourceMappingURL=cart-items.service.js.map