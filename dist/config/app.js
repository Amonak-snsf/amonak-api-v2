"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    name: process.env.APP_NAME || "AMONAK-API",
    staticUrl: process.env.STATIC_URL || "http://localhost:3000",
    apiUrl: process.env.API_URL || "http://localhost:3000/api",
    frontUrl: process.env.FRONT_URL || "http://localhost:4200",
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    fileDirectory: process.env.FILE_DIRECTORY || "./static",
    adminEmail: process.env.ADMIN_EMAIL || "aikpeachille55@gmail.com",
});
//# sourceMappingURL=app.js.map