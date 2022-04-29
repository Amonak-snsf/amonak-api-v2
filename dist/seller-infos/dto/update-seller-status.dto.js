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
exports.UpdateSellerStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const status_sellerInfo_1 = require("./status-seller-info");
class UpdateSellerStatusDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ enum: status_sellerInfo_1.Status }),
    (0, class_validator_1.IsIn)([status_sellerInfo_1.Status.read, status_sellerInfo_1.Status.accepted, status_sellerInfo_1.Status.refused, status_sellerInfo_1.Status.cancelled, status_sellerInfo_1.Status.created]),
    __metadata("design:type", Number)
], UpdateSellerStatusDto.prototype, "status", void 0);
exports.UpdateSellerStatusDto = UpdateSellerStatusDto;
//# sourceMappingURL=update-seller-status.dto.js.map