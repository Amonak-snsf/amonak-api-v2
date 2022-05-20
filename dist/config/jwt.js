"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    expire: parseInt(process.env.JWT_EXPIRE) || 259200,
    secret: process.env.JWT_SECRET || "amonak-snsf",
});
//# sourceMappingURL=jwt.js.map