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
exports.UpdateToptenDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_topten_dto_1 = require("./create-topten.dto");
const topten_status_interface_1 = require("./topten-status-interface");
class UpdateToptenDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_topten_dto_1.CreateToptenDto, ['files', 'name', 'product_nature', 'company', 'duration', 'user_id', 'price', 'website', 'message'])) {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], required: false }),
    __metadata("design:type", Array)
], UpdateToptenDto.prototype, "followers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false, default: topten_status_interface_1.Status.close }),
    (0, class_validator_1.IsIn)([topten_status_interface_1.Status.close, topten_status_interface_1.Status.disabled, topten_status_interface_1.Status.enabled]),
    __metadata("design:type", String)
], UpdateToptenDto.prototype, "status", void 0);
exports.UpdateToptenDto = UpdateToptenDto;
//# sourceMappingURL=update-topten.dto.js.map