"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCartDto = void 0;
const swagger = require("@nestjs/swagger");
const create_cart_dto = require("./create-cart.dto");
class UpdateCartDto extends (0, swagger.PartialType)(create_cart_dto.CreateCartDto) {
}
exports.UpdateCartDto = UpdateCartDto;
//# sourceMappingURL=update-cart.dto.js.map