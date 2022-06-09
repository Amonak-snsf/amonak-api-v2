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
exports.CreatePublicationManagementDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const publication_managements_type_dto_1 = require("./publication-managements-type.dto");
class CreatePublicationManagementDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], CreatePublicationManagementDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], CreatePublicationManagementDto.prototype, "publication", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], CreatePublicationManagementDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    (0, class_validator_1.IsIn)([publication_managements_type_dto_1.PubManagementType.delete, publication_managements_type_dto_1.PubManagementType.softDelete, publication_managements_type_dto_1.PubManagementType.softDeleteAll,
        publication_managements_type_dto_1.PubManagementType.follow, publication_managements_type_dto_1.PubManagementType.like, publication_managements_type_dto_1.PubManagementType.reporte, publication_managements_type_dto_1.PubManagementType.save,
        publication_managements_type_dto_1.PubManagementType.share, publication_managements_type_dto_1.PubManagementType.sideburn, publication_managements_type_dto_1.PubManagementType.signale,
        publication_managements_type_dto_1.PubManagementType.buy, publication_managements_type_dto_1.PubManagementType.comment, publication_managements_type_dto_1.PubManagementType.alerteResponse]),
    __metadata("design:type", String)
], CreatePublicationManagementDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationManagementDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], CreatePublicationManagementDto.prototype, "to", void 0);
exports.CreatePublicationManagementDto = CreatePublicationManagementDto;
//# sourceMappingURL=create-publication-management.dto.js.map