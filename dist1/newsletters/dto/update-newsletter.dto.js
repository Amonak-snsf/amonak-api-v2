"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNewsletterDto = void 0;
const swagger = require("@nestjs/swagger");
const create_newsletter_dto = require("./create-newsletter.dto");
class UpdateNewsletterDto extends (0, swagger.PartialType)(create_newsletter_dto.CreateNewsletterDto) {
}
exports.UpdateNewsletterDto = UpdateNewsletterDto;
//# sourceMappingURL=update-newsletter.dto.js.map