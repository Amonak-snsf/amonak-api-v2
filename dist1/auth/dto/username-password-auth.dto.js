"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernamePasswordAuthDto = void 0;
const swagger = require("@nestjs/swagger");
const create_auth_dto = require("./create-auth.dto");
class UsernamePasswordAuthDto extends (0, swagger.PickType)(create_auth_dto.CreateAuthDto, ['userName', 'password']) {
}
exports.UsernamePasswordAuthDto = UsernamePasswordAuthDto;
//# sourceMappingURL=username-password-auth.dto.js.map