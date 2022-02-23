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
const image_perform_url_1 = require("../utils/image-perform-url");
const biography_entity_1 = require("../biographies/entities/biography.entity");
const seller_info_entity_1 = require("../seller-infos/entities/seller-info.entity");
const status_seller_info_1 = require("../seller-infos/dto/status-seller-info");
const helpers_1 = require("../utils/helpers");
const isOnline = require('is-online');
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
    async register(createAuthDto, file, res) {
        this.data = createAuthDto;
        this.data.password = await (0, helpers_1.hashPassword)(createAuthDto.password);
        if (!file) {
            this.data.avatar = `/static/images/avatar/avatar.png`;
        }
        else {
            this.data.avatar = `/${file.path}`;
        }
        const user = await new this.userModel(this.data).save().catch(err => {
            return err;
        });
        if (user.keyPattern && user.keyPattern.email === 1) {
            return res.status(common_1.HttpStatus.NOT_ACCEPTABLE).json({ statusCode: 400, message: ['email address is already use'], error: "Bad Request" });
        }
        this.sendUserConfirmation(user);
        await new this.biographyModel({ user_id: user._id }).save();
        await new this.sellerInfoModel({ user_id: user._id, status: status_seller_info_1.Status.created }).save();
        return res.status(common_1.HttpStatus.CREATED).json({ message: 'Your are registered with success, Please check your mail to confirm your account !' });
    }
    async checkToken(token_id, res) {
        const fetch_token = await this.tokenModel.findOne({ _id: token_id }).exec()
            .catch(err => {
            return err;
        });
        if (!fetch_token.token) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Invalid token !' });
        }
        return await res.status(common_1.HttpStatus.OK).json({ message: 'Valid token !', token: fetch_token.token });
    }
    async resentActivationEmail(email, res) {
        const user = await this.userModel.findOne({ email: email }).exec();
        if (!user) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'email not found' });
        }
        const is_online = await isOnline({ timeout: 1000 });
        if (is_online) {
            this.sendUserConfirmation(user);
            return res.status(common_1.HttpStatus.OK).json({ message: 'Email send with success!' });
        }
        return res.status(common_1.HttpStatus.FORBIDDEN).json({ message: 'Email not send. Please check your network!' });
    }
    async activate(token, res) {
        let fetch_token = await this.tokenModel.findOne({ token: token }).exec();
        if (!fetch_token) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                type: 'token-error',
                message: 'We were unable to find a valid token. Your token may have expired.'
            });
        }
        let user = await this.userModel.findOneAndUpdate({ _id: fetch_token.user_id, status: false }, { status: true, is_log: true }).exec();
        if (!user) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                type: 'user-error',
                message: 'This user\'s account is already activated'
            });
        }
        const log_user = await this.logUser(user);
        return res.status(common_1.HttpStatus.OK).json(log_user);
    }
    async sendResetPasswordRequest(email, res) {
        const user = await this.userModel.findOne({ email: email }).exec();
        if (!user) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'email not found' });
        }
        const is_online = await isOnline({ timeout: 1000 });
        if (is_online) {
            this.sendResetPassswordRequestEmail(user);
            return res.status(common_1.HttpStatus.OK).json({ message: 'Email send with success!' });
        }
        return res.status(common_1.HttpStatus.FORBIDDEN).json({ message: 'Email not send. Please check your network!' });
    }
    async resetPassword(body, res) {
        const fetch_token = await this.tokenModel.findOne({ token: body.token }).exec();
        if (!fetch_token) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Invalid token !' });
        }
        const password = await (0, helpers_1.hashPassword)(body.password);
        const update_user = await this.userModel.findByIdAndUpdate(fetch_token.user_id, { password: password }).exec();
        if (!update_user) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'User not found !' });
        }
        const log_user = await this.logUser(update_user);
        return res.status(common_1.HttpStatus.OK).json(log_user);
    }
    async login(body, res) {
        const check_username = await (0, helpers_1.checkUsername)(body);
        const user = await this.userModel.findOne(check_username).exec();
        if (!user) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'User not found !' });
        }
        if (!bcrypt.compareSync(body.password, user.password)) {
            return res.status(common_1.HttpStatus.NOT_ACCEPTABLE).json({ message: 'Invalid password provided !' });
        }
        if (user.status === false) {
            return res.status(common_1.HttpStatus.NOT_ACCEPTABLE).json({ message: 'Your account has not been verified !' });
        }
        const log_user = await this.logUser(user);
        return res.status(common_1.HttpStatus.OK).json(log_user);
    }
    async checkEmail(email, res) {
        const user = await this.userModel.findOne({ email: email }).exec();
        if (!user) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json(false);
        }
        return res.status(common_1.HttpStatus.OK).json(true);
    }
    async sendUserConfirmation(user) {
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        const url = `${this.configService.get('front_url')}/auth/activation`;
        await new this.tokenModel({ token: token, user_id: user._id }).save();
        this.mailService.sendUserConfirmation(user, token, url);
    }
    async sendResetPassswordRequestEmail(user) {
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        const token_save = await new this.tokenModel({ token: token, user_id: user._id }).save();
        const url = `${this.configService.get('front_url')}/auth/reset-password/${token_save._id}`;
        this.mailService.resetPassword(user, url);
    }
    async logUser(user) {
        const payload = { email: user.email, sub: user._id };
        const access_token = this.jwtService.sign(payload);
        return {
            access_token: access_token,
            expiresIn: this.configService.get('expire'),
            user: (0, image_perform_url_1.imagePerform)(user, this.configService.get('static_url'))
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
        config_1.ConfigService, mail_service_1.MailService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map