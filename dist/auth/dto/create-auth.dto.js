"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("../../users/dto/create-user.dto");
class CreateAuthDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_user_dto_1.CreateUserDto, ['firstName', 'lastName', 'dialCode', 'phone', 'gender', 'birthDay', 'birthPlace', 'profession', 'bankCard', 'friends'])) {
}
exports.CreateAuthDto = CreateAuthDto;
//# sourceMappingURL=create-auth.dto.js.map