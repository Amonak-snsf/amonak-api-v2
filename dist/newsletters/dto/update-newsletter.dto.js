"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNewsletterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_newsletter_dto_1 = require("./create-newsletter.dto");
class UpdateNewsletterDto extends (0, swagger_1.PartialType)(create_newsletter_dto_1.CreateNewsletterDto) {
}
exports.UpdateNewsletterDto = UpdateNewsletterDto;
//# sourceMappingURL=update-newsletter.dto.js.map