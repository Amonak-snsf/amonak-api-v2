"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const common_1 = require("@nestjs/common");
const helpers_1 = require("./helpers");
const error = (data, httpCode) => {
    const errorMessage = (0, helpers_1.errorFilter)(data);
    if (data) {
        if (data.errors) {
            if (data.name == 'ValidationError' || data.name == 'CastError') {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    errors: errorMessage,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    errors: data,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        if (data.name == 'CastError' || data.name == 'ValidationError') {
            throw new common_1.HttpException({
                statusCode: httpCode !== null && httpCode !== void 0 ? httpCode : common_1.HttpStatus.BAD_REQUEST,
                errors: errorMessage,
            }, httpCode !== null && httpCode !== void 0 ? httpCode : common_1.HttpStatus.BAD_REQUEST);
        }
        if (httpCode) {
            throw new common_1.HttpException({
                statusCode: httpCode,
                errors: data,
            }, httpCode);
        }
        else {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                errors: data,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.error = error;
//# sourceMappingURL=error.js.map