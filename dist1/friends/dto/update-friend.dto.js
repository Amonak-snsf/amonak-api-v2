"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFriendDto = void 0;
const swagger = require("@nestjs/swagger");
const create_friend_dto = require("./create-friend.dto");
class UpdateFriendDto extends (0, swagger.PartialType)(create_friend_dto.CreateFriendDto) {
}
exports.UpdateFriendDto = UpdateFriendDto;
//# sourceMappingURL=update-friend.dto.js.map