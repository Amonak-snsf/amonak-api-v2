import { User } from 'src/users/entities/user.entity';
import { File } from 'src/seller-infos/dto/files-seller-info-interface';
export declare class CreateToptenDto {
    user_id: User;
    name: string;
    company: string;
    files: File[];
    message: String;
    website: String;
    product_nature: String[];
    duration: string;
    price: string;
}
