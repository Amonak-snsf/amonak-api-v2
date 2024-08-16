"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    db: {
        type: process.env.DATABASE_TYPE || "mongodb",
        host: process.env.DATABASE_HOST || "localhost",
        port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
        name: process.env.DATABASE_NAME || "amonak",
        password: process.env.DATABASE_PASSWORD || "F8jtnzkF6Xvt",
        username: process.env.DATABASE_USERNAME || "root",
        url: "mongodb+srv://amonak:P8uQfRzgziS5LBiU@amonak.pxlxz7a.mongodb.net/amonak1?retryWrites=true&w=majority&appName=Amonak",
    },
});
//# sourceMappingURL=database.js.map