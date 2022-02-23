"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const common_1 = require("@nestjs/common");
const helpers_1 = require("./helpers");
const error = (data, http_code) => {
    const error_message = (0, helpers_1.errorFilter)(data);
    if (data) {
        if (data.errors) {
            if (data.name == 'ValidationError' || data.name == 'CastError') {
                throw new common_1.HttpException({
                    status_code: common_1.HttpStatus.BAD_REQUEST,
                    errors: error_message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException({
                    status_code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    errors: data,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        if (data.name == 'CastError' || data.name == 'ValidationError') {
            throw new common_1.HttpException({
                status_code: http_code !== null && http_code !== void 0 ? http_code : common_1.HttpStatus.BAD_REQUEST,
                errors: error_message,
            }, http_code !== null && http_code !== void 0 ? http_code : common_1.HttpStatus.BAD_REQUEST);
        }
        if (http_code) {
            throw new common_1.HttpException({
                status_code: http_code,
                errors: data,
            }, http_code);
        }
        else {
            throw new common_1.HttpException({
                status_code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                errors: data,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.error = error;
//# sourceMappingURL=error.js.map