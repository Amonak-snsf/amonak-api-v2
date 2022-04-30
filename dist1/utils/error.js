"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const common = require("@nestjs/common");
const helpers = require("./helpers");
const error = (data, httpCode) => {
    const errorMessage = (0, helpers.errorFilter)(data);
    if (data) {
        if (data.errors) {
            if (data.name == 'ValidationError' || data.name == 'CastError') {
                throw new common.HttpException({
                    statusCode: common.HttpStatus.BAD_REQUEST,
                    errors: errorMessage,
                }, common.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common.HttpException({
                    statusCode: common.HttpStatus.INTERNAL_SERVER_ERROR,
                    errors: data,
                }, common.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        if (data.name == 'CastError' || data.name == 'ValidationError') {
            throw new common.HttpException({
                statusCode: httpCode !== null && httpCode !== void 0 ? httpCode : common.HttpStatus.BAD_REQUEST,
                errors: errorMessage,
            }, httpCode !== null && httpCode !== void 0 ? httpCode : common.HttpStatus.BAD_REQUEST);
        }
        if (httpCode) {
            throw new common.HttpException({
                statusCode: httpCode,
                errors: data,
            }, httpCode);
        }
        else {
            throw new common.HttpException({
                statusCode: common.HttpStatus.INTERNAL_SERVER_ERROR,
                errors: data,
            }, common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.error = error;
//# sourceMappingURL=error.js.map