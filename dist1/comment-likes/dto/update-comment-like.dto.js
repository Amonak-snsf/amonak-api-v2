"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommentLikeDto = void 0;
const swagger = require("@nestjs/swagger");
const create_comment_like_dto = require("./create-comment-like.dto");
class UpdateCommentLikeDto extends (0, swagger.PartialType)(create_comment_like_dto.CreateCommentLikeDto) {
}
exports.UpdateCommentLikeDto = UpdateCommentLikeDto;
//# sourceMappingURL=update-comment-like.dto.js.map