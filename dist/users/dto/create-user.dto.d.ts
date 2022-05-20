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
    address: Address[];
    bankCard: BankCard;
    friends: Friend[];
    status: Boolean;
    isLog: Boolean;
    isFirstTime: Boolean;
    isNewFeed: Boolean;
    accountType: string;
    lastConnected: Date;
}
