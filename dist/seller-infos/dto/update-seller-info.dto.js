"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSellerInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_seller_info_dto_1 = require("./create-seller-info.dto");
class UpdateSellerInfoDto extends (0, swagger_1.PartialType)(create_seller_info_dto_1.CreateSellerInfoDto) {
}
exports.UpdateSellerInfoDto = UpdateSellerInfoDto;
//# sourceMappingURL=update-seller-info.dto.js.map