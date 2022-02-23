export declare const userAddress: (address: any) => any;
export declare const bankCard: (bank_card: any) => any;
export declare const checkUsername: (body: any) => {
    email: any;
    username?: undefined;
} | {
    username: any;
    email?: undefined;
};
export declare const hashPassword: (password: any) => Promise<string>;
export declare const arrayToString: (data: any) => any;
export declare const errorFilter: (data: any) => {};
export declare const limitData: (body: any) => number;
export declare const userDataPopulateWithTopten: () => string[];
export declare const userDataPopulateWithComment: () => string[];
export declare const customFiles: (files: any) => any;
export declare const update_biography_body: (upDto: any) => {
    status: any;
    relationship: any;
    $push: {
        family_member: any;
        nickname: any;
        interested_by: any;
        politics: any;
        confessions: any;
        languages: any;
        web_sites: any;
        networks: any;
    };
};
export declare const sale_body: (body: any) => {
    content: any;
    name: any;
    price: number;
    max_weight: number;
    currency: any;
    quantity: number;
    purchase: number;
    address: any;
    files: any;
    user_id: any;
    category_id: any;
    status: any;
    from: string;
};
