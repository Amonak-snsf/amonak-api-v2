import { HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { error } from "./error";
import { arrayToString, limitData } from "./helpers";


export const exist = async (model: Model<any>, filter: Object) =>{

    const take_data = await model.findOne(filter).exec().catch(err =>{
        throw error(err, HttpStatus.NOT_FOUND);
    });

    if(!take_data){
        return false;
    }

    return take_data;
}

export const create = async (model: Model<any>, body: Object, populate?: String, populate_fields?: String | String[]) => {
    
    let data = await new model(body).save().catch(err =>{
        throw error(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    if(populate){
        data = data.populate(populate, arrayToString(populate_fields));
    }

    return data;
}

export const createIfne = async (model: Model<any>, body: Object, filter: Object, populate?: String, populate_fields?: String | String[]) => {

    const data_exist = await exist(model, filter);
    if(data_exist){
        throw error({ message: "data already exist !", body: data_exist }, HttpStatus.BAD_REQUEST);
    }

    let data = await new model(body).save().catch(err =>{
        throw error(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    if(populate){
        data = data.populate(populate, arrayToString(populate_fields));
    }

    return data;
}

export const one = async (model: Model<any>, filter: Object, fields?: String | String[], populate?: String, populate_fields?: String | String[]) => {
    
    const data = await model.findOne(filter, arrayToString(fields)).populate(populate, arrayToString(populate_fields)).catch(err =>{
        throw error(err, HttpStatus.NOT_FOUND);
    });

    return data;
}

export const all = async (model: Model<any>, filter: Object, fields?: String | String[], sort?: Object, limit?: Number, populate?: String, populate_fields?: String | String[]) => {
   
    const data = await model.find(filter, arrayToString(fields)).populate(populate, arrayToString(populate_fields)).sort(sort).limit(limitData(limit)).catch(err =>{
        throw error(err, HttpStatus.NOT_FOUND);
    });
    
    return data;
}

export const put = async (model: Model<any>, body: Object, filter: Object, populate?: String, populate_fields?: String | String[]) => {
    
    const data = await model.findOneAndUpdate(filter, body).populate(populate, arrayToString(populate_fields)).catch(err =>{
        throw error(err, HttpStatus.NOT_FOUND);
    });

    if(!data){
        return error('Model not found', HttpStatus.NOT_FOUND);
    }
    
    return await one(model, { _id: data._id }, null, populate, populate_fields);
}

export const destroy = async (model: Model<any>, filter: Object)=> {

    const data = await model.findByIdAndDelete(filter).catch(err => {
        throw error(err, HttpStatus.NOT_FOUND);
    });

    return data;
}
