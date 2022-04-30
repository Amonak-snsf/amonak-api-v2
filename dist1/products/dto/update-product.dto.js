"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductDto = void 0;
const swagger = require("@nestjs/swagger");
const create_product_dto = require("./create-product.dto");
class UpdateProductDto extends (0, swagger.PartialType)(create_product_dto.CreateProductDto) {
}
exports.UpdateProductDto = UpdateProductDto;
//# sourceMappingURL=update-product.dto.js.map