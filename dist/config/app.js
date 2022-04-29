"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    name: process.env.APP_NAME || 'AMONAK-API',
    staticUrl: process.env.STATIC_URL || 'http://localhost:3000',
    api_url: process.env.API_URL || 'http://localhost:3000/api',
    front_url: process.env.FRONT_URL || 'http://localhost:4200',
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    file_directory: process.env.FILE_DIRECTORY || './static',
    admin_email: process.env.ADMIN_EMAIL || 'aikpeachille55@gmail.com'
});
//# sourceMappingURL=app.js.map