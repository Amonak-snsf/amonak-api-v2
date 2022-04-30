"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvoiceDto = void 0;
const swagger = require("@nestjs/swagger");
const create_invoice_dto = require("./create-invoice.dto");
class UpdateInvoiceDto extends (0, swagger.PartialType)(create_invoice_dto.CreateInvoiceDto) {
}
exports.UpdateInvoiceDto = UpdateInvoiceDto;
//# sourceMappingURL=update-invoice.dto.js.map