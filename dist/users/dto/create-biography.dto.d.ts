import { User } from '../entities/user.entity';
export declare class CreateBiographyDto {
    user_id: User;
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
