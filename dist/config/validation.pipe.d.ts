import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class CustomValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): Promise<void>;
    private isEmpty;
    private formatErrors;
}
