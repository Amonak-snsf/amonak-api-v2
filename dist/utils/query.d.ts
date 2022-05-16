import { Model } from "mongoose";
export declare const exist: (model: Model<any>, filter: Record<string, any>) => Promise<any>;
export declare const create: (model: Model<any>, body: Record<string, any>, populate?: string, populateFields?: string | string[]) => Promise<any>;
export declare const createIfne: (model: Model<any>, body: Record<string, any>, filter: Record<string, any>, populate?: string, populateFields?: string | string[]) => Promise<any>;
export declare const one: (model: Model<any>, filter: Record<string, any>, fields?: string | string[], populate?: string, populateFields?: string | string[]) => Promise<any>;
export declare const all: (model: Model<any>, filter: Record<string, any>, fields?: string | string[], sort?: Object, limit?: Number, populate?: string, populateFields?: String | String[]) => Promise<Omit<any, never>[]>;
export declare const put: (model: Model<any>, body: Record<string, any>, filter: Record<string, any>, populate?: string, populateFields?: string | string[]) => Promise<any>;
export declare const destroy: (model: Model<any>, filter: Record<string, any>) => Promise<number>;
