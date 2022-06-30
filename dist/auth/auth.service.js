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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const mongoose_2 = require("mongoose");
const mail_service_1 = require("../mail/mail.service");
const token_entity_1 = require("../users/entities/token.entity");
const user_entity_1 = require("../users/entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const biography_entity_1 = require("../biographies/entities/biography.entity");
const seller_info_entity_1 = require("../seller-infos/entities/seller-info.entity");
const status_seller_info_1 = require("../seller-infos/dto/status-seller-info");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const error_1 = require("../utils/error");
const isOnline = require("is-online");
let AuthService = class AuthService {
    constructor(userModel, tokenModel, biographyModel, sellerInfoModel, configService, mailService, jwtService) {
        this.userModel = userModel;
        this.tokenModel = tokenModel;
        this.biographyModel = biographyModel;
        this.sellerInfoModel = sellerInfoModel;
        this.configService = configService;
        this.mailService = mailService;
        this.jwtService = jwtService;
    }
    async register(createAuthDto, res) {
        this.data = createAuthDto;
        this.data.password = await (0, helpers_1.hashPassword)(createAuthDto.password);
        this.data.address = (0, helpers_1.userAddress)(Array.isArray(this.data.address)
            ? this.data.address[0]
            : this.data.address);
        const user = await (0, query_1.create)(this.userModel, this.data);
        this.sendUserConfirmation(user);
        await new this.biographyModel({ user: user._id }).save();
        await new this.sellerInfoModel({
            user: user._id,
            status: status_seller_info_1.Status.sellerPending,
        }).save();
        return res.status(common_1.HttpStatus.CREATED).json({
            status: true,
            message: "Votre inscription a été faite avec succès. Veuillez vérifier votre boite e-mail pour confirmer votre compte!",
        });
    }
    async checkToken(tokenId, res) {
        await (0, query_1.one)(this.tokenModel, { _id: tokenId });
        return await res
            .status(common_1.HttpStatus.OK)
            .json({ status: true, message: "Valid token." });
    }
    async resentActivationEmail(email, res) {
        const user = await (0, query_1.one)(this.userModel, { email: email });
        const online = await isOnline({ timeout: 1000 });
        if (online) {
            this.sendUserConfirmation(user);
            return res
                .status(common_1.HttpStatus.OK)
                .json({ status: true, message: "Email send with success!" });
        }
        throw (0, error_1.error)({
            statusCode: common_1.HttpStatus.FORBIDDEN,
            message: "Email not send. Please check your network!",
        }, common_1.HttpStatus.FORBIDDEN);
    }
    async activate(token, res) {
        const fetchToken = await (0, query_1.one)(this.tokenModel, { token: token });
        if (!fetchToken) {
            throw (0, error_1.error)({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "Le code de confirmation que vous avez fourni est invalid.",
                display: true,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const user = await (0, query_1.put)(this.userModel, { status: true, isLog: true }, { _id: fetchToken.user, status: false });
        const logUser = await this.logUser(user);
        return res.status(common_1.HttpStatus.OK).json(logUser);
    }
    async sendResetPasswordRequest(email, res) {
        const user = await (0, query_1.exist)(this.userModel, { email: email });
        if (!user) {
            throw (0, error_1.error)({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "Ce compte n'existe pas.",
                display: true,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const online = await isOnline({ timeout: 1000 });
        if (online) {
            this.sendResetPassswordRequestEmail(user);
            return res.status(common_1.HttpStatus.OK).json({
                status: true,
                message: "Votre demande a été traité avec succès! Veuillez vérifier votre boite e-mail pour rénitialiser votre mot de passe.",
                display: true,
            });
        }
        throw (0, error_1.error)({
            statusCode: common_1.HttpStatus.FORBIDDEN,
            message: "Veuillez vérifier votre connexion internet!",
            display: true,
        }, common_1.HttpStatus.FORBIDDEN);
    }
    async resetPassword(body, res) {
        const fetchToken = await (0, query_1.one)(this.tokenModel, { _id: body.token });
        if (!fetchToken) {
            throw (0, error_1.error)({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "Le lien de réinitialisation de mot de passe que vous avez fourni est invalid.",
                display: true,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const password = await (0, helpers_1.hashPassword)(body.password);
        const updateUser = await (0, query_1.put)(this.userModel, { password: password, isLog: true }, { _id: fetchToken.user });
        const logUser = await this.logUser(updateUser);
        return res.status(common_1.HttpStatus.OK).json(logUser);
    }
    async login(body, res) {
        const checkUserName = await (0, helpers_1.checkUsername)(body);
        const user = await (0, query_1.exist)(this.userModel, checkUserName);
        if (!user) {
            throw (0, error_1.error)({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "Votre nom d'utilisateur est incorrecte.",
                display: true,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        if (!bcrypt.compareSync(body.password, user.password)) {
            throw (0, error_1.error)({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "Votre mot de passe est incorrecte.",
                display: true,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        if (user.status === false) {
            throw (0, error_1.error)({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "Votre compte n'est pas encore activé.",
                display: true,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const logUser = await this.logUser(user);
        return res.status(common_1.HttpStatus.OK).json(logUser);
    }
    async checkEmail(email, res) {
        await (0, query_1.one)(this.userModel, { email: email });
        return res.status(common_1.HttpStatus.OK).json({ status: true });
    }
    async auth(userId, res) {
        const data = await (0, query_1.one)(this.userModel, { _id: userId });
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async sendUserConfirmation(user) {
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        const url = `${this.configService.get("frontUrl")}/account-activation`;
        await (0, query_1.create)(this.tokenModel, { token: token, user: user._id });
        this.mailService.sendUserConfirmation(user, token, url);
    }
    async sendResetPassswordRequestEmail(user) {
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        const tokenSave = await new this.tokenModel({
            token: token,
            user: user._id,
        }).save();
        const url = `${this.configService.get("frontUrl")}/reset-password/${tokenSave._id}`;
        this.mailService.resetPassword(user, url);
    }
    async logUser(user) {
        const payload = { email: user.email, sub: user._id };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken: accessToken,
            expiresIn: this.configService.get("expire"),
            user: user,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(token_entity_1.Token.name)),
    __param(2, (0, mongoose_1.InjectModel)(biography_entity_1.Biography.name)),
    __param(3, (0, mongoose_1.InjectModel)(seller_info_entity_1.SellerInfo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService,
        mail_service_1.MailService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map