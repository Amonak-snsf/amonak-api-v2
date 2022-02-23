"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDestination = exports.editFileName = exports.imageFileFilter3 = exports.imageFileFilter2 = exports.imageFileFilter = void 0;
const path_1 = require("path");
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
const imageFileFilter3 = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|ico|aac|midi|wav|3gp|3g2|avi|mpeg|ogv|webm)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter3 = imageFileFilter3;
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
const fileDestination = (req, file, callBack) => {
    let dest;
    if (file.mimetype.match('video/*')) {
        dest = './static/videos/uploads';
    }
    else if (file.mimetype.match('image/*')) {
        dest = './static/images/uploads';
    }
    else if (file.mimetype.match('audios/*')) {
        dest = './static/audios/uploads';
    }
    else {
        dest = './static/documents/uploads';
    }
    callBack(null, dest);
};
exports.fileDestination = fileDestination;
//# sourceMappingURL=file-uploading.js.map