"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterMessage = void 0;
const swagger = require("@nestjs/swagger");
const filter_notification_dto = require("../../notifications/dto/filter-notification.dto");
class FilterMessage extends (0, swagger.PartialType)(filter_notification_dto.FilterNotification) {
}
exports.FilterMessage = FilterMessage;
//# sourceMappingURL=filter-message.dto.js.map