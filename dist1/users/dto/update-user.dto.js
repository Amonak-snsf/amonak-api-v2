"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const swagger = require("@nestjs/swagger");
const create_user_dto = require("./create-user.dto");
class UpdateUserDto extends (0, swagger.PartialType)((0, swagger.OmitType)(create_user_dto.CreateUserDto, ['password'])) {
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map