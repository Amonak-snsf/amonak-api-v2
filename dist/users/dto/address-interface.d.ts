export interface Address {
    countryName: {
        required: false;
        trim: true;
        type: String;
    };
    countryCode: {
        required: false;
        trim: true;
        type: String;
    };
    state: {
        required: false;
        trim: true;
        type: String;
    };
    city: {
        required: false;
        trim: true;
        type: String;
    };
    postalCode: {
        required: false;
        trim: true;
        type: String;
    };
    street: {
        required: false;
        trim: true;
        type: String;
    };
    fullAddress: {
        required: false;
        trim: true;
        type: String;
    };
}
