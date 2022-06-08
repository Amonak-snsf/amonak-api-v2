export declare const userAddress: (address: any) => any;
export declare const CustomBankCard: (bankCard: any) => any;
export declare const checkUsername: (body: any) => {
    email: any;
    userName?: undefined;
} | {
    userName: any;
    email?: undefined;
};
export declare const hashPassword: (password: any) => Promise<string>;
export declare const arrayToString: (data: any) => any;
export declare const errorFilter: (data: any) => {};
export declare const limitData: (body: any) => number;
export declare const userDataPopulateWithTopten: () => string[];
export declare const userDataPopulateWithComment: () => string[];
export declare const customFiles: (files: any) => any;
export declare const updateBiographyBody: (upDto: any) => {
    status: any;
    relationShip: any;
    $push: {
        familyMember: any;
        nickname: any;
        interestedBy: any;
        politics: any;
        confessions: any;
        languages: any;
        webSites: any;
        networks: any;
    };
};
export declare const saleBody: (body: any) => {
    content: any;
    name: any;
    price: number;
    maxWeight: number;
    currency: any;
    quantity: number;
    purchase: number;
    address: any;
    files: any;
    user: any;
    category: any;
    status: any;
    from: string;
};
