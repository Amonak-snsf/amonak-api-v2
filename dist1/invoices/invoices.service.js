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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const invoice_entity_1 = require("./entities/invoice.entity");
let InvoicesService = class InvoicesService {
    constructor(invoiceModel, configServe) {
        this.invoiceModel = invoiceModel;
        this.configServe = configServe;
    }
    async create(createInvoiceDto, res) {
        this.data = createInvoiceDto;
        this.data.invoice_url = `${this.configServe.get('front_url')}/invoice/${createInvoiceDto.paymentReference}`;
        const data = await (0, query_1.createIfne)(this.invoiceModel, this.data, { cart: createInvoiceDto.cart, user: createInvoiceDto.user, amount: createInvoiceDto.amount, status: createInvoiceDto.status });
        res.status(common_1.HttpStatus.OK).json(data);
    }
    async findAll(params, res) {
        const data = await (0, query_1.all)(this.invoiceModel, params, null, { createdAt: -1 }, params.limit, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(_id, res) {
        const data = await (0, query_1.one)(this.invoiceModel, { _id: _id }, null, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(_id, updateInvoiceDto, res) {
        const data = await (0, query_1.put)(this.invoiceModel, updateInvoiceDto, { _id: _id }, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        res.status(common_1.HttpStatus.OK).json(data);
    }
    async remove(_id, res) {
        const data = await (0, query_1.destroy)(this.invoiceModel, { _id: _id });
        res.status(common_1.HttpStatus.OK).json(data);
    }
    async success(params, res) {
        let isCompleted = false;
        let isWaiting = true;
        if (params.status == 'success') {
            isCompleted = true;
            isWaiting = false;
        }
        const data = await (0, query_1.put)(this.invoiceModel, { status: this.data.status, isWaiting: isWaiting, isCompleted: isCompleted }, { paymentReference: params.transaction }, 'user', (0, helpers_1.userDataPopulateWithTopten)());
        res.status(common_1.HttpStatus.OK).json(data);
    }
};
InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invoice_entity_1.Invoice.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], InvoicesService);
exports.InvoicesService = InvoicesService;
//# sourceMappingURL=invoices.service.js.map