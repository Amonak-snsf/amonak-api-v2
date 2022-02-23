import { Friend } from 'src/friends/entities/friend.entity';
import { Address } from './address-interface';
import { BankCard } from './bank-card-interface';
import { Gender } from './gender';
export declare class CreateUserDto {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    username: string;
    dial_code: string;
    phone: string;
    gender: Gender;
    birth_day: Date;
    birth_place: String;
    profession: string;
    sectors: string[];
    country_infos: string;
    address: Address;
    bank_card: BankCard;
    data: string;
    friends: Friend[];
    status: Boolean;
    is_log: Boolean;
    is_first_time: Boolean;
    is_new_feed: Boolean;
    account_type: string;
}
