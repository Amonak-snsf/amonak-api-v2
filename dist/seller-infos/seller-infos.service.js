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
exports.SellerInfosService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mail_service_1 = require("../mail/mail.service");
const user_account_type_enum_1 = require("../users/dto/user-account-type.enum");
const user_entity_1 = require("../users/entities/user.entity");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const status_seller_info_1 = require("./dto/status-seller-info");
const seller_info_entity_1 = require("./entities/seller-info.entity");
let SellerInfosService = class SellerInfosService {
    constructor(sellerInforModel, userModel, configService, mailService) {
        this.sellerInforModel = sellerInforModel;
        this.userModel = userModel;
        this.configService = configService;
        this.mailService = mailService;
        this.fileArray = [];
    }
    async findAll(params, res) {
        const data = await (0, query_1.all)(this.sellerInforModel, params, null, { created_at: -1 }, params.limit, 'user_id', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async findOne(user_id, res) {
        const data = await (0, query_1.one)(this.sellerInforModel, { user_id: user_id }, null, 'user_id', (0, helpers_1.userDataPopulateWithTopten)());
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async update(user_id, upDto, file, files, res) {
        this.data = upDto;
        if (file && file.path) {
            const fileReponse = {
                url: `/${file.path}`,
                type: file.mimetype
            };
            this.data.identity_card = fileReponse;
        }
        const custom_files = (0, helpers_1.customFiles)(files);
        if (custom_files) {
            this.data.files = custom_files;
        }
        const address = (0, helpers_1.userAddress)(upDto.address);
        if (address) {
            this.data.address = address;
        }
        this.data.status = status_seller_info_1.Status.read;
        await (0, query_1.put)(this.sellerInforModel, this.data, { user_id: user_id });
        this.account_type = user_account_type_enum_1.AccountType.pending;
        const user = await (0, query_1.put)(this.userModel, { account_type: this.account_type }, { user_id: user_id });
        return res.status(common_1.HttpStatus.OK).json(user);
    }
    async manageSellerInfoStatus(user_id, status, res) {
        await (0, query_1.put)(this.sellerInforModel, { status: status }, { user_id: user_id });
        const account = this.status(status);
        await (0, query_1.put)(this.userModel, { account_type: account }, { user_id: user_id });
        return res.status(common_1.HttpStatus.OK).json({ message: "User account status has been changed to " + this.account_type + " with success !" });
    }
    status(status) {
        if (status == status_seller_info_1.Status.accepted) {
            this.account_type = user_account_type_enum_1.AccountType.seller;
        }
        if (status == status_seller_info_1.Status.refused) {
            this.account_type = user_account_type_enum_1.AccountType.refused;
        }
        if (status == status_seller_info_1.Status.cancelled) {
            this.account_type = user_account_type_enum_1.AccountType.cancelled;
        }
        if (status == status_seller_info_1.Status.read) {
            this.account_type = user_account_type_enum_1.AccountType.pending;
        }
        return this.account_type;
    }
};
SellerInfosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(seller_info_entity_1.SellerInfo.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService, mail_service_1.MailService])
], SellerInfosService);
exports.SellerInfosService = SellerInfosService;
//# sourceMappingURL=seller-infos.service.js.map