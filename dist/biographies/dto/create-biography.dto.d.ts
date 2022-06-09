import { User } from "src/users/entities/user.entity";
export declare class CreateBiographyDto {
    relationShip: string;
    familyMember: User[];
    nickname: string[];
    interestedBy: string[];
    politics: string[];
    confessions: string[];
    languages: string[];
    webSites: string[];
    networks: string;
    status: string;
}
