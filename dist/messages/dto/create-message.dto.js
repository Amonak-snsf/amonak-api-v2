"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_notification_dto_1 = require("../../notifications/dto/create-notification.dto");
class CreateMessageDto extends (0, swagger_1.PartialType)(create_notification_dto_1.CreateNotificationDto) {
}
exports.CreateMessageDto = CreateMessageDto;
//# sourceMappingURL=create-message.dto.js.map