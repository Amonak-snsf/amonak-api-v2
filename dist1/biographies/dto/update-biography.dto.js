"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBiographyDto = void 0;
const swagger = require("@nestjs/swagger");
const create_biography_dto = require("./create-biography.dto");
class UpdateBiographyDto extends (0, swagger.PartialType)(create_biography_dto.CreateBiographyDto) {
}
exports.UpdateBiographyDto = UpdateBiographyDto;
//# sourceMappingURL=update-biography.dto.js.map