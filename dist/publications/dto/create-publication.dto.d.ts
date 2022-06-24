import { Files } from "src/users/dto/file-interface";
export declare class CreatePublicationDto {
    _id?: string;
    map?: string;
    content: string;
    files: Files[];
    user: string;
    share: string;
    product: string;
    status: boolean;
    type: string;
    saleContent: string;
    saleType: string;
    alerteType: string;
    alerteName: string;
    alerteDuration: string;
    publicity: string;
    phone: string;
    shareMessage: string;
}
