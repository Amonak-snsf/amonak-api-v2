import { HttpException, HttpStatus } from "@nestjs/common";
import { errorFilter } from "./helpers";

export const error = (data, httpCode?: number) => {

    const errorMessage = errorFilter(data);

    if (data) {
        if (data.errors) {
            
            if (data.name == 'ValidationError' || data.name == 'CastError') {
                throw new HttpException({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: data.message,
                    errors: errorMessage,
                }, HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: data.message,
                    errors: data,
                }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        if (data.name == 'CastError' || data.name == 'ValidationError') {
            throw new HttpException({
                statusCode: httpCode ?? HttpStatus.BAD_REQUEST,
                message: data.message,
                errors: errorMessage,
            }, httpCode ?? HttpStatus.BAD_REQUEST);
        }

        if (httpCode) {
            throw new HttpException({
                statusCode: httpCode,
                message: data.message,
                errors: data,
            }, httpCode);
        }
        else {
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: data.message,
                errors: data,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}


