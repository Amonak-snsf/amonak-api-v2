/* eslint-disable prettier/prettier 
export interface Files {
  destination: string;
  type: string;
  extension: string;
  originalname: string;
  filename: string;
  size: number;
  url: string;
  serverUrl: string;
}*/
export interface Files{
	
  destination: { required: false, trim: true, type: String, select: true },
  type: { required: false, trim: true, type: String, select: true },
  extension: { required: false, trim: true, type:String, select: true },
  originalname: { required: false, trim: true, type: String, select: true },
  filename: { required: false, trim: true, type: String, select: true },
  size: { required: false, trim: true, type: Number, select: true},
  url: { required: false, trim: true, type: string, select: true },
  serverUrl: { required: false, trim: true, type: string, select: true },
} 