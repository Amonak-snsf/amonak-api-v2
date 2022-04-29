import { Address } from 'src/users/dto/address-interface';
import { File } from 'src/seller-infos/dto/files-seller-info-interface';
export declare class CreateProductDto {
    name: String;
    content: String;
    price: Number;
    quantity: Number;
    maxWeight: Number;
    purchase: Number;
    currency: String;
    files: File[];
    address: Address;
    category: String;
    user: String;
    status: Boolean;
}
