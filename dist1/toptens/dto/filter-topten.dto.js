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
exports.FilterToptenDto = void 0;
const swagger = require("@nestjs/swagger");
const create_topten_dto = require("./create-topten.dto");
const topten_status_interface = require("./topten-status-interface");
class FilterToptenDto extends (0, swagger.PartialType)((0, swagger.OmitType)(create_topten_dto.CreateToptenDto, ['files'])) {
}
__decorate([
    (0, swagger.ApiProperty)({ type: String, required: false }),
    __metadata("design:type", String)
], FilterToptenDto.prototype, "status", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: [String], required: false }),
    __metadata("design:type", Array)
], FilterToptenDto.prototype, "followers", void 0);
__decorate([
    (0, swagger.ApiProperty)({ type: Number, required: false }),
    __metadata("design:type", Number)
], FilterToptenDto.prototype, "limit", void 0);
exports.FilterToptenDto = FilterToptenDto;
//# sourceMappingURL=filter-topten.dto.js.map