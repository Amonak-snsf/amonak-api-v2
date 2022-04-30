"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChatDto = void 0;
const swagger = require("@nestjs/swagger");
const create_chat_dto = require("./create-chat.dto");
class UpdateChatDto extends (0, swagger.PartialType)(create_chat_dto.CreateChatDto) {
}
exports.UpdateChatDto = UpdateChatDto;
//# sourceMappingURL=update-chat.dto.js.map