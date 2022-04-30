"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    db: {
        type: process.env.DATABASE_TYPE || 'mongodb',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        name: process.env.DATABASE_NAME || 'amonak',
        password: process.env.DATABASE_PASSWORD || '',
    }
});
//# sourceMappingURL=database.js.map