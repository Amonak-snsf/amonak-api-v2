"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSellerInfoDto = void 0;
const swagger = require("@nestjs/swagger");
const create_sellerInfo_dto = require("./create-seller-info.dto");
class UpdateSellerInfoDto extends (0, swagger.PartialType)(create_sellerInfo_dto.CreateSellerInfoDto) {
}
exports.UpdateSellerInfoDto = UpdateSellerInfoDto;
//# sourceMappingURL=update-seller-info.dto.js.map