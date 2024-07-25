//eslint-disable prettier/prettier 
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