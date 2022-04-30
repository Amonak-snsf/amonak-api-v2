"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewslettersModule = void 0;
const common = require("@nestjs/common");
const newsletters_service = require("./newsletters.service");
const newsletters_controller = require("./newsletters.controller");
const mongoose = require("@nestjs/mongoose");
const newsletter_entity = require("./entities/newsletter.entity");
let NewslettersModule = class NewslettersModule {
};
NewslettersModule = __decorate([
    (0, common.Module)({
        imports: [
            mongoose.MongooseModule.forFeature([{ name: newsletter_entity.Newsletter.name, schema: newsletter_entity.NewsletterSchema }]),
        ],
        controllers: [newsletters_controller.NewslettersController],
        providers: [newsletters_service.NewslettersService]
    })
], NewslettersModule);
exports.NewslettersModule = NewslettersModule;
//# sourceMappingURL=newsletters.module.js.map