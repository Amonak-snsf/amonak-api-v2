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
exports.AuthController = void 0;
const common = require("@nestjs/common");
const platform_express = require("@nestjs/platform-express");
const swagger = require("@nestjs/swagger");
const multer = require("multer");
const file_uploading = require("../utils/file-uploading");
const auth_service = require("./auth.service");
const create_auth_dto = require("./dto/create-auth.dto");
const email_auth_dto = require("./dto/email-auth.dto");
const token_password_auth_dto = require("./dto/token-password-auth.dto");
const username_password_auth_dto = require("./dto/username-password-auth.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(createAuthDto, file, res) {
        return this.authService.register(createAuthDto, file, res);
    }
    checkToken(token, res) {
        return this.authService.checkToken(token, res);
    }
    resentActivationEmail(emailAuth, res) {
        return this.authService.resentActivationEmail(emailAuth.email, res);
    }
    activate(token, res) {
        return this.authService.activate(+token, res);
    }
    sendResetPasswordRequest(email, res) {
        return this.authService.sendResetPasswordRequest(email, res);
    }
    resetPassword(body, res) {
        return this.authService.resetPassword(body, res);
    }
    login(body, res) {
        return this.authService.login(body, res);
    }
    checkEmail(emailAuth, res) {
        return this.authService.checkEmail(emailAuth.email, res);
    }
};
__decorate([
    (0, common.Post)('register'),
    (0, common.UseInterceptors)((0, platform_express.FileInterceptor)('avatar', {
        storage: (0, multer.diskStorage)({
            destination: './static/images/avatar',
            filename: file_uploading.editFileName,
        }),
        fileFilter: file_uploading.imageFileFilter,
    })),
    __param(0, (0, common.Body)()),
    __param(1, (0, common.UploadedFile)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto.CreateAuthDto, Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common.Get)('check-token/:token'),
    __param(0, (0, common.Param)('token')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "checkToken", null);
__decorate([
    (0, common.Post)('resend-activation-email'),
    __param(0, (0, common.Body)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_auth_dto.EmailAuthDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resentActivationEmail", null);
__decorate([
    (0, common.Get)('activate/:token'),
    __param(0, (0, common.Param)('token')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "activate", null);
__decorate([
    (0, common.Get)('send-reset-password-request/:email'),
    __param(0, (0, common.Param)('email')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "sendResetPasswordRequest", null);
__decorate([
    (0, common.Post)('reset-password'),
    __param(0, (0, common.Body)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [token_password_auth_dto.TokenPasswordAuthDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common.Post)('login'),
    __param(0, (0, common.Body)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [username_password_auth_dto.UsernamePasswordAuthDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common.Post)('check-email'),
    __param(0, (0, common.Body)()),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_auth_dto.EmailAuthDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "checkEmail", null);
AuthController = __decorate([
    (0, swagger.ApiTags)('auth'),
    (0, swagger.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map