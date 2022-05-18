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
exports.ToptensController = void 0;
const common_1 = require("@nestjs/common");
const toptens_service_1 = require("./toptens.service");
const create_topten_dto_1 = require("./dto/create-topten.dto");
const update_topten_dto_1 = require("./dto/update-topten.dto");
const swagger_1 = require("@nestjs/swagger");
const filter_topten_dto_1 = require("./dto/filter-topten.dto");
let ToptensController = class ToptensController {
    constructor(toptensService) {
        this.toptensService = toptensService;
    }
    create(createToptenDto, res) {
        return this.toptensService.create(createToptenDto, res);
    }
    findAll(body, res) {
        return this.toptensService.findAll(body, res);
    }
    findOne(_id, res) {
        return this.toptensService.findOne(_id, res);
    }
    update(_id, updateToptenDto, res) {
        return this.toptensService.update(_id, updateToptenDto, res);
    }
    remove(_id, res) {
        return this.toptensService.remove(_id, res);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_topten_dto_1.CreateToptenDto, Object]),
    __metadata("design:returntype", void 0)
], ToptensController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_topten_dto_1.FilterToptenDto, Object]),
    __metadata("design:returntype", void 0)
], ToptensController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':_id'),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ToptensController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':_id'),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_topten_dto_1.UpdateToptenDto, Object]),
    __metadata("design:returntype", void 0)
], ToptensController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':_id'),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ToptensController.prototype, "remove", null);
ToptensController = __decorate([
    (0, swagger_1.ApiTags)('toptens'),
    (0, swagger_1.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common_1.Controller)('api/toptens'),
    __metadata("design:paramtypes", [toptens_service_1.ToptensService])
], ToptensController);
exports.ToptensController = ToptensController;
//# sourceMappingURL=toptens.controller.js.map