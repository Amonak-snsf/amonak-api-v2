"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = void 0;
class Endpoint {
    constructor(configService) {
        this.configService = configService;
        this.staticUrl = process.env.STATIC_URL;
    }
}
exports.Endpoint = Endpoint;
//# sourceMappingURL=endpoint.js.map