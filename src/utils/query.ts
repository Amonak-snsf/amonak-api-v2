import { HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { error } from "./error";
import { arrayToString, limitData } from "./helpers";


export const exist = async (model: Model<any>, filter: Object) =>{

    const takeData = await model.findOne(filter).exec().catch(err =>{
        throw error(err, HttpStatus.NOT_FOUND);
    });

    if(!takeData){
        return false;
    }

    return takeData;
}

export const create = async (model: Model<any>, body: Object, populate?: String, populateFields?: String | String[]) => {
    
    let data = await new model(body).save().catch(err =>{
        throw error(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    if(populate){
        data = data.populate(populate, arrayToString(populateFields));
    }

    return data;
}

export const createIfne = async (model: Model<any>, body: Object, filter: Object, populate?: String, populateFields?: String | String[]) => {

    const dataExist = await exist(model, filter);
    if(dataExist){
        throw error({ message: "data already exist !", body: dataExist }, HttpStatus.BAD_REQUEST);
    }

    let data = await new model(body).save().catch(err =>{
        throw error(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    if(populate){
        data = data.populate(populate, arrayToString(populateFields));
    }

    return data;
}

export const one = async (model: Model<any>, filter: Object, fields?: String | String[], populate?: String, populateFields?: String | String[]) => {
    
    const data = await model.findOne(filter, arrayToString(fields)).populate(populate, arrayToString(populateFields)).catch(err =>{
        throw error(err, HttpStatus.NOT_FOUND);
    });

    return data;
}

export const all = async (model: Model<any>, filter: Object, fields?: String | String[], sort?: Object, limit?: Number, populate?: String, populateFields?: String | String[]) => {
   
    const data = await model.find(filter, arrayToString(fields)).populate(populate, arrayToString(populateFields)).sort(sort).limit(limitData(limit)).catch(err =>{
        throw error(err, HttpStatus.NOT_FOUND);
    });
    
    return data;
}

export const put = async (model: Model<any>, body: Object, filter: Object, populate?: String, populateFields?: String | String[]) => {
    
    const data = await model.findOneAndUpdate(filter, body).populate(populate, arrayToString(populateFields)).catch(err =>{
        throw error(err, HttpStatus.NOT_FOUND);
    });

    if(!data){
        return error('Model not found', HttpStatus.NOT_FOUND);
    }
    
    return await one(model, { _id: data._id }, null, populate, populateFields);
}

export const destroy = async (model: Model<any>, filter: Object)=> {

    await model.findByIdAndDelete(filter).catch(err => {
        throw error(err, HttpStatus.NOT_FOUND);
    });

    return 1;
}
