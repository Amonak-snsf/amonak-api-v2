import { User } from '../entities/user.entity';
export declare class CreateBiographyDto {
    user: User;
    relationShip: string;
    familyMember: User[];
    nickname: string[];
    interestedBy: string[];
    politics: string[];
    confessions: string[];
    languages: string[];
    webSites: string[];
    networks: String;
    status: string;
}
