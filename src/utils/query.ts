/* eslint-disable prettier/prettier */
import { HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { error } from "./error";
import { arrayToString, limitData } from "./helpers";


export const exist = async (model: Model<any>, filter: Record<string, any>) =>{

    const takeData = await model.findOne(filter).exec().catch(err =>{
        return error;
    });

    if(!takeData){
        return false;
    }

    return takeData;
}

export const create = async (model: Model<any>, body: Record<string, any>, populate?: string, populateFields?: string | string[]) => {
    
    let data = await new model(body).save().catch(err =>{
        throw error(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    if(populate){
        data = data.populate(populate, arrayToString(populateFields));
    }

    return data;
}

export const createIfne = async (model: Model<any>, body: Record<string, any>, filter: Record<string, any>, populate?: string, populateFields?: string | string[]) => {

    const dataExist = await exist(model, filter);
    if(dataExist){
        return { message: "validation.modelExist", body: dataExist };
    }

    let data = await new model(body).save().catch(err =>{
        throw error(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    if(populate){
        data = data.populate(populate, arrayToString(populateFields));
    }

    return data;
}

export const one = async (model: Model<any>, filter: Record<string, any>, fields?: string | string[], populate?: string, populateFields?: string | string[], sort?: {}) => {
    
    let data = await model.findOne(filter, arrayToString(fields)).sort(sort).catch(err =>{
        throw error(err, HttpStatus.NOT_FOUND);
     });
    
    if(populate){
        data = data.populate(populate, arrayToString(populateFields));
    }

    return data;
}

export const all = async (model: Model<any>, filter: Record<string, any>, fields?: string | string[], sort?: {}, limit?: number, populate?: string, populateFields?: string | string[]) => {
   
    const data = await model.find(filter, arrayToString(fields)).populate(populate, arrayToString(populateFields)).sort(sort).limit(limitData(limit)).catch(err =>{
        throw error(err, HttpStatus.NOT_FOUND);
    });
    
    return data;
}

export const allDistinct = async (model: Model<any>, field: string, filter: Record<string, any>, sort?: {}, limit?: number, populate?: string, populateFields?: string | string[]) => {
   
    const data = await model.distinct(field, filter).populate(populate, arrayToString(populateFields)).catch(err =>{
        throw error(err, HttpStatus.NOT_FOUND);
    });
    
    return data;
}

export const put = async (model: Model<any>, body: Record<string, any>, filter: Record<string, any>, populate?: string, populateFields?: string | string[]) => {

    const data = await model.findOneAndUpdate(filter, body).catch(err =>{
        throw error(err, HttpStatus.NOT_FOUND);
    });

    if(!data){
        return error('validation.modelNotFound', HttpStatus.NOT_FOUND);
    }
    
    return await one(model, { _id: data._id }, null, populate, arrayToString(populateFields));
}

export const destroy = async (model: Model<any>, filter: Record<string, any>)=> {

    await model.findByIdAndDelete(filter).catch(err => {
        throw error(err, HttpStatus.NOT_FOUND);
    });

    return 1;
}
