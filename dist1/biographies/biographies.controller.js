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
exports.BiographiesController = void 0;
const common = require("@nestjs/common");
const swagger = require("@nestjs/swagger");
const biographies_service = require("./biographies.service");
const update_biography_dto = require("./dto/update-biography.dto");
let BiographiesController = class BiographiesController {
    constructor(biographiesService) {
        this.biographiesService = biographiesService;
    }
    findOne(user, res) {
        return this.biographiesService.findOne(user, res);
    }
    update(user, updateBiographyDto, res) {
        return this.biographiesService.update(user, updateBiographyDto, res);
    }
};
__decorate([
    (0, common.Get)(':user'),
    __param(0, (0, common.Param)('user')),
    __param(1, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BiographiesController.prototype, "findOne", null);
__decorate([
    (0, common.Patch)(':user'),
    __param(0, (0, common.Param)('user')),
    __param(1, (0, common.Body)()),
    __param(2, (0, common.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_biography_dto.UpdateBiographyDto, Object]),
    __metadata("design:returntype", void 0)
], BiographiesController.prototype, "update", null);
BiographiesController = __decorate([
    (0, swagger.ApiTags)('biography'),
    (0, swagger.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common.Controller)('api/biographies'),
    __metadata("design:paramtypes", [biographies_service.BiographiesService])
], BiographiesController);
exports.BiographiesController = BiographiesController;
//# sourceMappingURL=biographies.controller.js.map