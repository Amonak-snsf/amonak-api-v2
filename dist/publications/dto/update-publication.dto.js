"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePublicationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_publication_dto_1 = require("./create-publication.dto");
class UpdatePublicationDto extends (0, swagger_1.PickType)(create_publication_dto_1.CreatePublicationDto, ['status']) {
}
exports.UpdatePublicationDto = UpdatePublicationDto;
//# sourceMappingURL=update-publication.dto.js.map