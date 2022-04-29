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
exports.NewslettersController = void 0;
const common_1 = require("@nestjs/common");
const newsletters_service_1 = require("./newsletters.service");
const create_newsletter_dto_1 = require("./dto/create-newsletter.dto");
const update_newsletter_dto_1 = require("./dto/update-newsletter.dto");
const swagger_1 = require("@nestjs/swagger");
const filter_newsletter_dto_1 = require("./dto/filter-newsletter.dto");
let NewslettersController = class NewslettersController {
    constructor(newslettersService) {
        this.newslettersService = newslettersService;
    }
    create(createNewsletterDto, res) {
        return this.newslettersService.create(createNewsletterDto, res);
    }
    findAll(params, res) {
        return this.newslettersService.findAll(params, res);
    }
    findOne(_id, res) {
        return this.newslettersService.findOne(_id, res);
    }
    update(_id, updateNewsletterDto, res) {
        return this.newslettersService.update(_id, updateNewsletterDto, res);
    }
    remove(_id, res) {
        return this.newslettersService.remove(_id, res);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_newsletter_dto_1.CreateNewsletterDto, Object]),
    __metadata("design:returntype", void 0)
], NewslettersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_newsletter_dto_1.FilterNewsLetterDto, Object]),
    __metadata("design:returntype", void 0)
], NewslettersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':_id'),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NewslettersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':_id'),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_newsletter_dto_1.UpdateNewsletterDto, Object]),
    __metadata("design:returntype", void 0)
], NewslettersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':_id'),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NewslettersController.prototype, "remove", null);
NewslettersController = __decorate([
    (0, swagger_1.ApiTags)('newsletters'),
    (0, swagger_1.ApiHeader)({
        name: 'lang',
        description: 'language',
    }),
    (0, common_1.Controller)('api/newsletters'),
    __metadata("design:paramtypes", [newsletters_service_1.NewslettersService])
], NewslettersController);
exports.NewslettersController = NewslettersController;
//# sourceMappingURL=newsletters.controller.js.map