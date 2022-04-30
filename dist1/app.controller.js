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
const common = require("@nestjs/common");
const app_service = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    staticImagesAvatar(file_name, res) {
        return res.sendFile(file_name, { root: './static/images/avatar' });
    }
    staticImagesUploads(file_name, res) {
        return res.sendFile(file_name, { root: './static/images/uploads' });
    }
    staticVideosAvatar(file_name, res) {
        return res.sendFile(file_name, { root: './static/videos/uploads' });
    }
    staticVideossUploads(file_name, res) {
        return res.sendFile(file_name, { root: './static' });
    }
};
__decorate([
    (0, common.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common.Get)('static/images/avatar/:file_name'),
    __param(0, (0, common.Param)('file_name')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "staticImagesAvatar", null);
__decorate([
    (0, common.Get)('static/images/uploads/:file_name'),
    __param(0, (0, common.Param)('file_name')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "staticImagesUploads", null);
__decorate([
    (0, common.Get)('static/videos/uploads/:file_name'),
    __param(0, (0, common.Param)('file_name')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "staticVideosAvatar", null);
__decorate([
    (0, common.Get)('static/:file_name'),
    __param(0, (0, common.Param)('file_name')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "staticVideossUploads", null);
AppController = __decorate([
    (0, common.Controller)(),
    __metadata("design:paramtypes", [app_service.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map