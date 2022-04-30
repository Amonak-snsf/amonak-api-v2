"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAuthDto = void 0;
const swagger = require("@nestjs/swagger");
const create_auth_dto = require("./create-auth.dto");
class EmailAuthDto extends (0, swagger.PickType)(create_auth_dto.CreateAuthDto, ['email']) {
}
exports.EmailAuthDto = EmailAuthDto;
//# sourceMappingURL=email-auth.dto.js.map