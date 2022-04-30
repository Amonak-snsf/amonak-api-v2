import { Friend } from 'src/friends/entities/friend.entity';
import { Address } from './address-interface';
import { BankCard } from './bank-card-interface';
import { Gender } from './gender';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userName: string;
    dialCode: string;
    phone: string;
    gender: Gender;
    birthDay: Date;
    birthPlace: String;
    profession: string;
    sectors: string[];
    country_infos: string;
    address: Address;
    bankCard: BankCard;
    data: string;
    friends: Friend[];
    status: Boolean;
    isLog: Boolean;
    is_first_time: Boolean;
    is_new_feed: Boolean;
    accountType: string;
}
