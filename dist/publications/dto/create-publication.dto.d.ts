import { Files } from "src/users/dto/file-interface";
export declare class CreatePublicationDto {
    content: String;
    files: Files[];
    user: String;
    product: String;
    status: Boolean;
    type: String;
    saleContent: String;
    saleType: String;
    alerteType: String;
    alerteName: String;
    alerteDuration: String;
    publicity: String;
    phone: String;
}
