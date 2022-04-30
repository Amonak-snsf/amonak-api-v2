"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommentDto = void 0;
const swagger = require("@nestjs/swagger");
const create_comment_dto = require("./create-comment.dto");
class UpdateCommentDto extends (0, swagger.PartialType)(create_comment_dto.CreateCommentDto) {
}
exports.UpdateCommentDto = UpdateCommentDto;
//# sourceMappingURL=update-comment.dto.js.map