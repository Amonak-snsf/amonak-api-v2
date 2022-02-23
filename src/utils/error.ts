import { HttpException, HttpStatus } from "@nestjs/common";
import { errorFilter } from "./helpers";

export const error = (data, http_code?) => {

    const error_message = errorFilter(data);

    if (data) {
        if (data.errors) {
            if (data.name == 'ValidationError' || data.name == 'CastError') {
                throw new HttpException({
                    status_code: HttpStatus.BAD_REQUEST,
                    errors: error_message,
                }, HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException({
                    status_code: HttpStatus.INTERNAL_SERVER_ERROR,
                    errors: data,
                }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        if (data.name == 'CastError' || data.name == 'ValidationError') {
            throw new HttpException({
                status_code: http_code ?? HttpStatus.BAD_REQUEST,
                errors: error_message,
            }, http_code ?? HttpStatus.BAD_REQUEST);
        }

        if (http_code) {
            throw new HttpException({
                status_code: http_code,
                errors: data,
            }, http_code);
        }
        else {
            throw new HttpException({
                status_code: HttpStatus.INTERNAL_SERVER_ERROR,
                errors: data,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}


