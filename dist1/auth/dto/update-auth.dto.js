"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthDto = void 0;
const swagger = require("@nestjs/swagger");
const create_auth_dto = require("./create-auth.dto");
class UpdateAuthDto extends (0, swagger.OmitType)(create_auth_dto.CreateAuthDto, ['password']) {
}
exports.UpdateAuthDto = UpdateAuthDto;
//# sourceMappingURL=update-auth.dto.js.map