import { Address } from 'src/users/dto/address-interface';
import { File } from 'src/seller-infos/dto/files-seller-info-interface';
export declare class CreateProductDto {
    name: string;
    content: string;
    price: number;
    quantity: Number;
    maxWeight: number;
    currency: string;
    files: File[];
    address: Address;
    category: string;
    user: string;
    status: boolean;
    buys?: number;
}
