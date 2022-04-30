"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuthDto = void 0;
const swagger = require("@nestjs/swagger");
const create_user_dto = require("../../users/dto/create-user.dto");
class CreateAuthDto extends (0, swagger.PartialType)((0, swagger.OmitType)(create_user_dto.CreateUserDto, ['firstName', 'lastName', 'dialCode', 'phone', 'gender', 'birthDay', 'birthPlace', 'profession', 'sectors', 'address', 'bankCard', 'friends'])) {
}
exports.CreateAuthDto = CreateAuthDto;
//# sourceMappingURL=create-auth.dto.js.map