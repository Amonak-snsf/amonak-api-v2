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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterSeller = void 0;
const swagger = require("@nestjs/swagger");
const class_validator = require("class-validator");
const create_sellerInfo_dto = require("./create-seller-info.dto");
const status_sellerInfo = require("./status-seller-info");
class FilterSeller extends (0, swagger.PartialType)((0, swagger.OmitType)(create_sellerInfo_dto.CreateSellerInfoDto, ['identityCard', 'files', 'address', 'message'])) {
}
__decorate([
    (0, swagger.ApiProperty)({ enum: status_sellerInfo.Status }),
    (0, class_validator.IsIn)([status_sellerInfo.Status.read, status_sellerInfo.Status.accepted, status_sellerInfo.Status.refused, status_sellerInfo.Status.cancelled, status_sellerInfo.Status.created]),
    __metadata("design:type", Number)
], FilterSeller.prototype, "status", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: Number, required: false }),
    __metadata("design:type", Number)
], FilterSeller.prototype, "limit", void 0);
exports.FilterSeller = FilterSeller;
//# sourceMappingURL=filter-seller.dto.js.map