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
exports.SignupListener = void 0;
const common = require("@nestjs/common");
const config = require("@nestjs/config");
const event_emitter = require("@nestjs/event-emitter");
const mongoose = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const biography_entity = require("../biographies/entities/biography.entity");
const mail_service = require("../mail/mail.service");
const status_seller_info = require("../seller-infos/dto/status-seller-info");
const seller_info_entity = require("../seller-infos/entities/seller-info.entity");
const token_entity = require("../users/entities/token.entity");
let SignupListener = class SignupListener {
    constructor(biographyModel, sellerInfoModel, configService, mailService, tokenModel) {
        this.biographyModel = biographyModel;
        this.sellerInfoModel = sellerInfoModel;
        this.configService = configService;
        this.mailService = mailService;
        this.tokenModel = tokenModel;
    }
    handleSignupEvent(user) {
        console.log(user);
        this.sendUserConfirmation(user);
        new this.biographyModel({ user: user._id }).save();
        new this.sellerInfoModel({ user: user._id, status: status_seller_info.Status.accepted }).save();
    }
    saveSignup(data) {
        this.sendUserConfirmation(data);
        new this.biographyModel({ user: data._id }).save();
        new this.sellerInfoModel({ user: data._id, status: status_seller_info.Status.accepted }).save();
    }
    sendUserConfirmation(user) {
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        const url = `${this.configService.get('front_url')}/auth/activation`;
        new this.tokenModel({ token: token, user: user._id }).save();
        this.mailService.sendUserConfirmation(user, token, url);
    }
};
__decorate([
    (0, event_emitter.OnEvent)('signup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SignupListener.prototype, "handleSignupEvent", null);
SignupListener = __decorate([
    (0, common.Injectable)(),
    __param(0, (0, mongoose.InjectModel)(biography_entity.Biography.name)),
    __param(1, (0, mongoose.InjectModel)(seller_info_entity.SellerInfo.name)),
    __param(4, (0, mongoose.InjectModel)(token_entity.Token.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        config.ConfigService, mail_service.MailService,
        mongoose_2.Model])
], SignupListener);
exports.SignupListener = SignupListener;
//# sourceMappingURL=signup-listener.js.map