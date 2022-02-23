import { User } from 'src/users/entities/user.entity';
export declare class CreateBiographyDto {
    relationship: string;
    family_member: User[];
    nickname: string[];
    interested_by: string[];
    politics: string[];
    confessions: string[];
    languages: string[];
    web_sites: string[];
    networks: String;
    status: string;
}
