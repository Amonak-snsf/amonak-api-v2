"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMessageDto = void 0;
const swagger = require("@nestjs/swagger");
const create_message_dto = require("./create-message.dto");
class UpdateMessageDto extends (0, swagger.PartialType)(create_message_dto.CreateMessageDto) {
}
exports.UpdateMessageDto = UpdateMessageDto;
//# sourceMappingURL=update-message.dto.js.map