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
exports.CartsController = void 0;
const common = require("@nestjs/common");
const swagger = require("@nestjs/swagger");
const carts_service = require("./carts.service");
const create_cart_dto = require("./dto/create-cart.dto");
const filter_cart_dto = require("./dto/filter-cart.dto");
const update_cart_dto = require("./dto/update-cart.dto");
let CartsController = class CartsController {
    constructor(cartsService) {
        this.cartsService = cartsService;
    }
    create(createCartDto, res) {
        return this.cartsService.create(createCartDto, res);
    }
    findAll(params, res) {
        return this.cartsService.findAll(params, res);
    }
    findOne(_id, res) {
        return this.cartsService.findOne(_id, res);
    }
    update(_id, updateCartDto, res) {
        return this.cartsService.update(_id, updateCartDto, res);
    }
    remove(_id, res) {
        return this.cartsService.remove(_id, res);
    }
};
__decorate([
    (0, common.Post)(),
    __param(0, (0, common.Body)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cart_dto.CreateCartDto, Object]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "create", null);
__decorate([
    (0, common.Get)(),
    __param(0, (0, common.Query)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_cart_dto.FilterCart, Object]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "findAll", null);
__decorate([
    (0, common.Get)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "findOne", null);
__decorate([
    (0, common.Patch)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Body)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cart_dto.UpdateCartDto, Object]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "update", null);
__decorate([
    (0, common.Delete)(':_id'),
    __param(0, (0, common.Param)('_id')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "remove", null);
CartsController = __decorate([
    (0, swagger.ApiTags)('carts'),
    (0, swagger.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common.Controller)('api/carts'),
    __metadata("design:paramtypes", [carts_service.CartsService])
], CartsController);
exports.CartsController = CartsController;
//# sourceMappingURL=carts.controller.js.map