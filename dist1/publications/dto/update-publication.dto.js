"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePublicationDto = void 0;
const swagger = require("@nestjs/swagger");
const create_publication_dto = require("./create-publication.dto");
class UpdatePublicationDto extends (0, swagger.PickType)(create_publication_dto.CreatePublicationDto, ['status']) {
}
exports.UpdatePublicationDto = UpdatePublicationDto;
//# sourceMappingURL=update-publication.dto.js.map