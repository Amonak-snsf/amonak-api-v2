"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleBody = exports.updateBiographyBody = exports.customFiles = exports.userDataPopulateWithComment = exports.userDataPopulateWithTopten = exports.limitData = exports.errorFilter = exports.arrayToString = exports.hashPassword = exports.checkUsername = exports.CustomBankCard = exports.userAddress = void 0;
const bcrypt = require("bcrypt");
const userAddress = (address) => {
    if (address && typeof address === 'object') {
        if (address.countryName) {
            address.countryName = address.countryName;
        }
        if (address.countryCode) {
            address.countryCode = address.countryCode;
        }
        if (address.state) {
            address.state = address.state;
        }
        if (address.city) {
            address.city = address.city;
        }
        if (address.postalCode) {
            address.postalCode = address.postalCode;
        }
        if (address.street) {
            address.street = address.street;
        }
    }
    return address;
};
exports.userAddress = userAddress;
const CustomBankCard = (bankCard) => {
    if (bankCard && typeof bankCard === 'object') {
        if (bankCard.number) {
            bankCard.number = bankCard.number;
        }
        if (bankCard.cvc) {
            bankCard.cvc = bankCard.cvc;
        }
        if (bankCard.zip) {
            bankCard.zip = bankCard.zip;
        }
        if (bankCard.address) {
            bankCard.address = bankCard.address;
        }
    }
    return bankCard;
};
exports.CustomBankCard = CustomBankCard;
const checkUsername = (body) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (emailRegexp.test(body.userName)) {
        return { email: body.userName };
    }
    else {
        return { userName: body.userName };
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
    let errorMessage = {};
    if (data.errors) {
        for (var err in data.errors) {
            if (err) {
                errorMessage[err] = data.errors[err].message.split(' (type')[0].replace('"', '').replace('"', '').replace("\\", '').replace('\\', '');
            }
        }
    }
    if (!data.errors && (data.name == 'ValidationError' || data.name == 'CastError')) {
        errorMessage[data.path] = data.message.split(' (type')[0].replace('"', '').replace('"', '').replace("\\", '').replace('\\"', '');
    }
    return errorMessage;
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
    return ['avatar', 'email', 'userName', 'gender', 'dialCode', 'phone', 'accountType', 'address', 'sectors', 'isLog'];
};
exports.userDataPopulateWithTopten = userDataPopulateWithTopten;
const userDataPopulateWithComment = () => {
    return ['avatar', 'email', 'userName', 'sectors'];
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
const updateBiographyBody = (upDto) => {
    return {
        status: upDto.status,
        relationShip: upDto.relationShip,
        $push: {
            familyMember: Array.isArray(upDto.familyMember) ? upDto.familyMember : [upDto.familyMember],
            nickname: Array.isArray(upDto.nickname) ? upDto.nickname : [upDto.nickname],
            interestedBy: Array.isArray(upDto.interestedBy) ? upDto.interestedBy : [upDto.interestedBy],
            politics: Array.isArray(upDto.politics) ? upDto.politics : [upDto.politics],
            confessions: Array.isArray(upDto.confessions) ? upDto.confessions : [upDto.confessions],
            languages: Array.isArray(upDto.languages) ? upDto.languages : [upDto.languages],
            webSites: Array.isArray(upDto.webSites) ? upDto.webSites : [upDto.webSites],
            networks: Array.isArray(upDto.networks) ? upDto.networks : [upDto.networks],
        }
    };
};
exports.updateBiographyBody = updateBiographyBody;
const saleBody = (body) => {
    return {
        content: body.content,
        name: body.name,
        price: parseFloat(body.price),
        maxWeight: parseInt(body.maxWeight),
        currency: body.currency,
        quantity: parseInt(body.quantity),
        purchase: parseInt(body.purchase),
        address: body.address,
        files: body.files,
        user: body.user,
        category: body.category,
        status: body.productStatus,
        from: 'publication',
    };
};
exports.saleBody = saleBody;
//# sourceMappingURL=helpers.js.map