"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernamePasswordAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_auth_dto_1 = require("./create-auth.dto");
class UsernamePasswordAuthDto extends (0, swagger_1.PickType)(create_auth_dto_1.CreateAuthDto, [
    "email",
    "password",
]) {
}
exports.UsernamePasswordAuthDto = UsernamePasswordAuthDto;
//# sourceMappingURL=username-password-auth.dto.js.map