"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDestination = exports.editFileName = exports.allImageFileFilter = void 0;
const path_1 = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const allImageFileFilter = (req, file, callback) => {
    if (!file.mimetype.match('video/*') &&
        !file.mimetype.match('image/*') && !file.mimetype.match('application/pdf')) {
        return callback(new Error('Only image, video and pdf files are allowed!'), false);
    }
    callback(null, true);
};
exports.allImageFileFilter = allImageFileFilter;
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(30)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
const fileDestination = async (req, file, callBack) => {
    var _a;
    const token = (_a = req.headers['authorization']) !== null && _a !== void 0 ? _a : '';
    let user;
    let username;
    try {
        user = jwt.verify(token.toString().replace('Bearer ', ''), 'amonak-snsf');
        username = `/${user.email}`;
    }
    catch (err) {
        console.log(err.message);
        username = `/unknowuser`;
    }
    let dest;
    if (file.mimetype.match('video/*')) {
        dest = `./static/uploads${username}/videos`;
    }
    else if (file.mimetype.match('image/*')) {
        dest = `./static/uploads${username}/images`;
    }
    else if (file.mimetype.match('audios/*')) {
        dest = `./static/uploads${username}/audios`;
    }
    else {
        dest = `./static/uploads${username}/documents`;
    }
    callBack(null, makeDirectory(dest));
};
exports.fileDestination = fileDestination;
const makeDirectory = (path) => {
    try {
        fs.mkdirSync(path, { recursive: true });
    }
    catch (err) {
        path = "static";
    }
    return path;
};
//# sourceMappingURL=file-uploading.js.map