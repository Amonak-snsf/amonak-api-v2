"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthsService = void 0;
const common = require("@nestjs/common");
let AuthsService = class AuthsService {
    create(createAuthDto) {
        return 'This action adds a new auth';
    }
    findAll() {
        return `This action returns all auths`;
    }
    findOne(_id) {
        return `This action returns a #${_id} auth`;
    }
    update(_id, updateAuthDto) {
        return `This action updates a #${_id} auth`;
    }
    remove(_id) {
        return `This action removes a #${_id} auth`;
    }
};
AuthsService = __decorate([
    (0, common.Injectable)()
], AuthsService);
exports.AuthsService = AuthsService;
//# sourceMappingURL=auths.service.js.map