"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_auth_dto_1 = require("./create-auth.dto");
class EmailAuthDto extends (0, swagger_1.PickType)(create_auth_dto_1.CreateAuthDto, ['email']) {
}
exports.EmailAuthDto = EmailAuthDto;
//# sourceMappingURL=email-auth.dto.js.map