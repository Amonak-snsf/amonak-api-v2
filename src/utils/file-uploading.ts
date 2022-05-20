/* eslint-disable prettier/prettier */
import { extname } from "path";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const imageFileFilter2 = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|docx|doc)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const allImageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|ico|aac|midi|wav|3gp|3g2|avi|mpeg|ogv|webm|gz|ggp|doc|docx|pdf|xls|xlsx|ppt|mp4|avi|mp3|wma|wmv|kine|swf)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
  
export const editFileName = (req, file, callback) => {
  
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(30)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  };

export const fileDestination = async (req, file, callBack) => {

  const token = req.headers['authorization']?? '';
  let user: any; 
  let username: string;

  try {
    user = jwt.verify(token.toString().replace('Bearer ', ''), 'amonak-snsf');
    username = `/${user.email}`
  } catch(err) {
    console.log(err.message);
    username = `/unknowuser`;
  }

  let dest;
  if(file.mimetype.match('video/*')) {
      dest = `./static/uploads${username}/videos`;
  } else if(file.mimetype.match('image/*')) {
      dest = `./static/uploads${username}/images`;
  } else  if(file.mimetype.match('audios/*')) {
      dest = `./static/uploads${username}/audios`;
  } else {
      dest = `./static/uploads${username}/documents`;
  }

  callBack(null, makeDirectory(dest));
}


const makeDirectory = (path: string) =>{

  try{fs.mkdirSync(path, { recursive: true })}
  catch(err){path = "static"}

  return path;
 }
