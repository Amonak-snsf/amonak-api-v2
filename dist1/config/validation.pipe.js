"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationPipe = void 0;
const common = require("@nestjs/common");
const class_transformer = require("class-transformer");
const class_validator = require("class-validator");
let CustomValidationPipe = class CustomValidationPipe {
    async transform(value, metadata) {
        const { metatype } = metadata;
        if (this.isEmpty(value)) {
            throw new common.HttpException('Validation failed: No playload provided', common.HttpStatus.BAD_REQUEST);
        }
        const object = (0, class_transformer.plainToClass)(metatype, value);
        const errors = await (0, class_validator.validate)(object);
        if (errors.length > 0) {
            throw new common.HttpException('Validation failed: ' + this.formatErrors(errors), common.HttpStatus.BAD_REQUEST);
        }
    }
    isEmpty(value) {
        if (Object.keys(value).length < 1) {
            return true;
        }
        else {
            return false;
        }
    }
    formatErrors(errors) {
        return errors.map(error => {
            for (let key in error.constraints) {
                return error.constraints[key];
            }
        }).join((', '));
    }
};
CustomValidationPipe = __decorate([
    (0, common.Injectable)()
], CustomValidationPipe);
exports.CustomValidationPipe = CustomValidationPipe;
//# sourceMappingURL=validation.pipe.js.map