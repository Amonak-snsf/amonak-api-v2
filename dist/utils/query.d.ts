import { Model } from "mongoose";
export declare const exist: (model: Model<any>, filter: Object) => Promise<any>;
export declare const create: (model: Model<any>, body: Object, populate?: String, populateFields?: String | String[]) => Promise<any>;
export declare const createIfne: (model: Model<any>, body: Object, filter: Object, populate?: String, populateFields?: String | String[]) => Promise<any>;
export declare const one: (model: Model<any>, filter: Object, fields?: String | String[], populate?: String, populateFields?: String | String[]) => Promise<any>;
export declare const all: (model: Model<any>, filter: Object, fields?: String | String[], sort?: Object, limit?: Number, populate?: String, populateFields?: String | String[]) => Promise<any[]>;
export declare const put: (model: Model<any>, body: Object, filter: Object, populate?: String, populateFields?: String | String[]) => Promise<any>;
export declare const destroy: (model: Model<any>, filter: Object) => Promise<number>;
