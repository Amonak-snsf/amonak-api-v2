import { User } from 'src/users/entities/user.entity';
import { File } from 'src/seller-infos/dto/files-seller-info-interface';
export declare class CreateToptenDto {
    user: User;
    name: string;
    company: string;
    files: File[];
    content: String;
    webSites: String;
    productNature: String[];
    duration: string;
    price: string;
}
