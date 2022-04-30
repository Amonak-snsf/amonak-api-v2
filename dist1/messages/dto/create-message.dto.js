"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageDto = void 0;
const swagger = require("@nestjs/swagger");
const create_notification_dto = require("../../notifications/dto/create-notification.dto");
class CreateMessageDto extends (0, swagger.PartialType)(create_notification_dto.CreateNotificationDto) {
}
exports.CreateMessageDto = CreateMessageDto;
//# sourceMappingURL=create-message.dto.js.map