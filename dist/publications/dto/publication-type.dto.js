"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleType = exports.AlerteDuration = exports.AlerteType = exports.PublicationType = void 0;
var PublicationType;
(function (PublicationType) {
    PublicationType["post"] = "post";
    PublicationType["sale"] = "sale";
    PublicationType["alerte"] = "alerte";
    PublicationType["publicity"] = "publicity";
    PublicationType["share"] = "share";
    PublicationType["default"] = "default";
})(PublicationType = exports.PublicationType || (exports.PublicationType = {}));
var AlerteType;
(function (AlerteType) {
    AlerteType["default"] = "default";
    AlerteType["urgent"] = "urgent";
})(AlerteType = exports.AlerteType || (exports.AlerteType = {}));
var AlerteDuration;
(function (AlerteDuration) {
    AlerteDuration["default"] = "short";
})(AlerteDuration = exports.AlerteDuration || (exports.AlerteDuration = {}));
var SaleType;
(function (SaleType) {
    SaleType["default"] = "default";
})(SaleType = exports.SaleType || (exports.SaleType = {}));
//# sourceMappingURL=publication-type.dto.js.map