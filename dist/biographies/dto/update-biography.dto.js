"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBiographyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_biography_dto_1 = require("./create-biography.dto");
class UpdateBiographyDto extends (0, swagger_1.PartialType)(create_biography_dto_1.CreateBiographyDto) {
}
exports.UpdateBiographyDto = UpdateBiographyDto;
//# sourceMappingURL=update-biography.dto.js.map