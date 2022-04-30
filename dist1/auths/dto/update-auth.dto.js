"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthDto = void 0;
const mapped_types = require("@nestjs/mapped-types");
const create_auth_dto = require("./create-auth.dto");
class UpdateAuthDto extends (0, mapped_types.PartialType)(create_auth_dto.CreateAuthDto) {
}
exports.UpdateAuthDto = UpdateAuthDto;
//# sourceMappingURL=update-auth.dto.js.map