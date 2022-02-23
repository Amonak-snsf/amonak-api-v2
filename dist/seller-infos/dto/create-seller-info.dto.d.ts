import { Address } from 'src/users/dto/address-interface';
import { File } from './files-seller-info-interface';
export declare class CreateSellerInfoDto {
    email: string;
    phone_number: string;
    files: File[];
    identity_card: File;
    address: Address;
    product_nature: String[];
    type: String;
    message: string;
}
