"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterMessage = void 0;
const swagger_1 = require("@nestjs/swagger");
const filter_notification_dto_1 = require("../../notifications/dto/filter-notification.dto");
class FilterMessage extends (0, swagger_1.PartialType)(filter_notification_dto_1.FilterNotification) {
}
exports.FilterMessage = FilterMessage;
//# sourceMappingURL=filter-message.dto.js.map