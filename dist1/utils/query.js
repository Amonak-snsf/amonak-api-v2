"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.put = exports.all = exports.one = exports.createIfne = exports.create = exports.exist = void 0;
const common_1 = require("@nestjs/common");
const error_1 = require("./error");
const helpers_1 = require("./helpers");
const exist = async (model, filter) => {
    const takeData = await model.findOne(filter).exec().catch(err => {
        throw (0, error_1.error)(err, common_1.HttpStatus.NOT_FOUND);
    });
    if (!takeData) {
        return false;
    }
    return takeData;
};
exports.exist = exist;
const create = async (model, body, populate, populateFields) => {
    let data = await new model(body).save().catch(err => {
        throw (0, error_1.error)(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    });
    if (populate) {
        data = data.populate(populate, (0, helpers_1.arrayToString)(populateFields));
    }
    return data;
};
exports.create = create;
const createIfne = async (model, body, filter, populate, populateFields) => {
    const dataExist = await (0, exports.exist)(model, filter);
    if (dataExist) {
        throw (0, error_1.error)({ message: "data already exist !", body: dataExist }, common_1.HttpStatus.BAD_REQUEST);
    }
    let data = await new model(body).save().catch(err => {
        throw (0, error_1.error)(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    });
    if (populate) {
        data = data.populate(populate, (0, helpers_1.arrayToString)(populateFields));
    }
    return data;
};
exports.createIfne = createIfne;
const one = async (model, filter, fields, populate, populateFields) => {
    const data = await model.findOne(filter, (0, helpers_1.arrayToString)(fields)).populate(populate, (0, helpers_1.arrayToString)(populateFields)).catch(err => {
        throw (0, error_1.error)(err, common_1.HttpStatus.NOT_FOUND);
    });
    return data;
};
exports.one = one;
const all = async (model, filter, fields, sort, limit, populate, populateFields) => {
    const data = await model.find(filter, (0, helpers_1.arrayToString)(fields)).populate(populate, (0, helpers_1.arrayToString)(populateFields)).sort(sort).limit((0, helpers_1.limitData)(limit)).catch(err => {
        throw (0, error_1.error)(err, common_1.HttpStatus.NOT_FOUND);
    });
    return data;
};
exports.all = all;
const put = async (model, body, filter, populate, populateFields) => {
    const data = await model.findOneAndUpdate(filter, body).populate(populate, (0, helpers_1.arrayToString)(populateFields)).catch(err => {
        throw (0, error_1.error)(err, common_1.HttpStatus.NOT_FOUND);
    });
    if (!data) {
        return (0, error_1.error)('Model not found', common_1.HttpStatus.NOT_FOUND);
    }
    return await (0, exports.one)(model, { _id: data._id }, null, populate, populateFields);
};
exports.put = put;
const destroy = async (model, filter) => {
    await model.findByIdAndDelete(filter).catch(err => {
        throw (0, error_1.error)(err, common_1.HttpStatus.NOT_FOUND);
    });
    return 1;
};
exports.destroy = destroy;
//# sourceMappingURL=query.js.map