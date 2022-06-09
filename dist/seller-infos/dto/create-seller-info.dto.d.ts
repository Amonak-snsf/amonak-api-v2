import { Address } from 'src/users/dto/address-interface';
import { File } from './files-seller-info-interface';
export declare class CreateSellerInfoDto {
    email: string;
    phone: string;
    files: File[];
    identityCard: File;
    address: Address;
    productNature: String[];
    type: string;
    message: string;
}
