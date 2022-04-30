"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCartItemDto = void 0;
const swagger = require("@nestjs/swagger");
const create_cart_item_dto = require("./create-cart-item.dto");
class UpdateCartItemDto extends (0, swagger.PartialType)(create_cart_item_dto.CreateCartItemDto) {
}
exports.UpdateCartItemDto = UpdateCartItemDto;
//# sourceMappingURL=update-cart-item.dto.js.map