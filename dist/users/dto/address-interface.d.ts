export interface Address {
    country_name: {
        required: false;
        trim: true;
        type: String;
    };
    country_code: {
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
    postal_code: {
        required: false;
        trim: true;
        type: String;
    };
    street: {
        required: false;
        trim: true;
        type: String;
    };
    full_address: {
        required: false;
        trim: true;
        type: String;
    };
}
