"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryDto = void 0;
const swagger = require("@nestjs/swagger");
const create_category_dto = require("./create-category.dto");
class UpdateCategoryDto extends (0, swagger.PartialType)(create_category_dto.CreateCategoryDto) {
}
exports.UpdateCategoryDto = UpdateCategoryDto;
//# sourceMappingURL=update-category.dto.js.map