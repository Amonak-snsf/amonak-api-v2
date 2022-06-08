"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDestination = exports.editFileName = exports.allImageFileFilter = exports.imageFileFilter2 = exports.imageFileFilter = void 0;
const path_1 = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const imageFileFilter2 = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|docx|doc)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter2 = imageFileFilter2;
const allImageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(apng|bmp|pjpeg|webp|jpg|jpeg|png|gif|bmp|ico|aac|midi|wav|3gp|3g2|avi|mpeg|ogv|webm|gz|ggp|doc|docx|pdf|xls|xlsx|ppt|mp4|avi|mp3|wma|wmv|kine|swf)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
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