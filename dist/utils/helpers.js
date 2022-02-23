"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sale_body = exports.update_biography_body = exports.customFiles = exports.userDataPopulateWithComment = exports.userDataPopulateWithTopten = exports.limitData = exports.errorFilter = exports.arrayToString = exports.hashPassword = exports.checkUsername = exports.bankCard = exports.userAddress = void 0;
const bcrypt = require("bcrypt");
const userAddress = (address) => {
    if (address && typeof address === 'object') {
        if (address.country_name) {
            address.country_name = address.country_name;
        }
        if (address.country_code) {
            address.country_code = address.country_code;
        }
        if (address.state) {
            address.state = address.state;
        }
        if (address.city) {
            address.city = address.city;
        }
        if (address.postal_code) {
            address.postal_code = address.postal_code;
        }
        if (address.street) {
            address.street = address.street;
        }
    }
    return address;
};
exports.userAddress = userAddress;
const bankCard = (bank_card) => {
    if (bank_card && typeof bank_card === 'object') {
        if (bank_card.number) {
            bank_card.number = bank_card.number;
        }
        if (bank_card.cvc) {
            bank_card.cvc = bank_card.cvc;
        }
        if (bank_card.zip) {
            bank_card.zip = bank_card.zip;
        }
        if (bank_card.address) {
            bank_card.address = bank_card.address;
        }
    }
    return bank_card;
};
exports.bankCard = bankCard;
const checkUsername = (body) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (emailRegexp.test(body.username)) {
        return { email: body.username };
    }
    else {
        return { username: body.username };
    }
};
exports.checkUsername = checkUsername;
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const arrayToString = (data) => {
    let convert;
    if (data) {
        if (Array.isArray(data)) {
            data.forEach(el => {
                convert = convert + ` ${el}`;
            });
        }
        else {
            convert = `${data}`;
        }
    }
    return convert;
};
exports.arrayToString = arrayToString;
const errorFilter = (data) => {
    let error_message = {};
    if (data.errors) {
        for (var err in data.errors) {
            if (err) {
                error_message[err] = data.errors[err].message.split(' (type')[0].replace('"', '').replace('"', '').replace("\\", '').replace('\\', '');
            }
        }
    }
    if (!data.errors && (data.name == 'ValidationError' || data.name == 'CastError')) {
        error_message[data.path] = data.message.split(' (type')[0].replace('"', '').replace('"', '').replace("\\", '').replace('\\"', '');
    }
    return error_message;
};
exports.errorFilter = errorFilter;
const limitData = (body) => {
    var _a;
    if (body) {
        return (_a = parseInt(body)) !== null && _a !== void 0 ? _a : 10;
    }
    return 100;
};
exports.limitData = limitData;
const userDataPopulateWithTopten = () => {
    return ['avatar', 'email', 'username', 'gender', 'dial_code', 'phone', 'account_type', 'address', 'sectors', 'is_log'];
};
exports.userDataPopulateWithTopten = userDataPopulateWithTopten;
const userDataPopulateWithComment = () => {
    return ['avatar', 'email', 'username', 'sectors'];
};
exports.userDataPopulateWithComment = userDataPopulateWithComment;
const customFiles = (files) => {
    let fileArray;
    if (files && files.length) {
        files = Array.isArray(files) ? files : [files];
        files.forEach(elt => {
            const fileReponse = {
                url: `/${elt.path}`,
                type: elt.mimetype
            };
            fileArray.push(fileReponse);
        });
    }
    return fileArray;
};
exports.customFiles = customFiles;
const update_biography_body = (upDto) => {
    return {
        status: upDto.status,
        relationship: upDto.relationship,
        $push: {
            family_member: Array.isArray(upDto.family_member) ? upDto.family_member : [upDto.family_member],
            nickname: Array.isArray(upDto.nickname) ? upDto.nickname : [upDto.nickname],
            interested_by: Array.isArray(upDto.interested_by) ? upDto.interested_by : [upDto.interested_by],
            politics: Array.isArray(upDto.politics) ? upDto.politics : [upDto.politics],
            confessions: Array.isArray(upDto.confessions) ? upDto.confessions : [upDto.confessions],
            languages: Array.isArray(upDto.languages) ? upDto.languages : [upDto.languages],
            web_sites: Array.isArray(upDto.web_sites) ? upDto.web_sites : [upDto.web_sites],
            networks: Array.isArray(upDto.networks) ? upDto.networks : [upDto.networks],
        }
    };
};
exports.update_biography_body = update_biography_body;
const sale_body = (body) => {
    return {
        content: body.content,
        name: body.name,
        price: parseFloat(body.price),
        max_weight: parseInt(body.max_weight),
        currency: body.currency,
        quantity: parseInt(body.quantity),
        purchase: parseInt(body.purchase),
        address: body.address,
        files: body.files,
        user_id: body.user_id,
        category_id: body.category_id,
        status: body.product_status,
        from: 'publication',
    };
};
exports.sale_body = sale_body;
//# sourceMappingURL=helpers.js.map