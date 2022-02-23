export declare const exist: (model: any, filter: Object) => Promise<any>;
export declare const create: (model: any, body: Object, populate?: String, populate_fields?: any) => Promise<any>;
export declare const createIfne: (model: any, body: Object, filter: Object, populate?: String, populate_fields?: any) => Promise<any>;
export declare const one: (model: any, filter: Object, fields?: any, populate?: String, populate_fields?: any) => Promise<any>;
export declare const all: (model: any, filter: Object, fields?: any, sort?: Object, limit?: Number, populate?: String, populate_fields?: any) => Promise<any>;
export declare const put: (model: any, body: Object, filter: Object, populate?: String, populate_fields?: any) => Promise<any>;
export declare const destroy: (model: any, filter: any) => Promise<any>;
