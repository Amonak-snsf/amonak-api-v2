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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const file_uploading_1 = require("./utils/file-uploading");
const config_1 = require("@nestjs/config");
const fs = require("fs");
let AppController = class AppController {
    constructor(appService, config) {
        this.appService = appService;
        this.config = config;
    }
    getHello() {
        return this.appService.getHello();
    }
    upload(files, res, req) {
        const data = [];
        if (files) {
            for (const file of files) {
                data.push({
                    destination: file.destination.replace('./static/', ''),
                    type: file.mimetype.split('/')[0],
                    extension: file.mimetype.split('/')[1],
                    originalname: file.originalname,
                    filename: file.filename,
                    size: file.size,
                    url: `${file.destination.replace('./static/', '')}/${file.filename}`,
                    serverUrl: `${this.config.get('staticUrl')}`
                });
            }
        }
        return res.status(200).json(data);
    }
    remove(path, res) {
        let status = true;
        try {
            fs.unlinkSync(`./static/${path}`);
        }
        catch (err) {
            status = false;
            console.log(err.message);
        }
        return res.status(200).json(status);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: file_uploading_1.fileDestination,
            filename: file_uploading_1.editFileName,
        }),
        fileFilter: file_uploading_1.allImageFileFilter,
    })),
    (0, common_1.Post)('api/uploads'),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "upload", null);
__decorate([
    (0, common_1.Post)('api/remove'),
    __param(0, (0, common_1.Body)('path')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "remove", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService, config_1.ConfigService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map