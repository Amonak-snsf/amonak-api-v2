export interface Files {
    destination: {
        required: false;
        trim: true;
        type: string;
        select: true;
    };
    type: {
        required: false;
        trim: true;
        type: string;
        select: true;
    };
    extension: {
        required: false;
        trim: true;
        type: string;
        select: true;
    };
    originalname: {
        required: false;
        trim: true;
        type: string;
        select: true;
    };
    filename: {
        required: false;
        trim: true;
        type: string;
        select: true;
    };
    size: {
        required: false;
        trim: true;
        type: number;
        select: true;
    };
    url: {
        required: false;
        trim: true;
        type: string;
        select: true;
    };
    serverUrl: {
        required: false;
        trim: true;
        type: string;
        select: true;
    };
}
