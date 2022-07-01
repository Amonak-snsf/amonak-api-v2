
import { Body, Controller, Get, Post, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileDestination, allImageFileFilter } from 'src/utils/file-uploading';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { HttpException, HttpStatus } from "@nestjs/common";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private config: ConfigService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: fileDestination,
        filename: editFileName,
      }),
      fileFilter: allImageFileFilter,
  }),
  )
  @Post('api/uploads')
  upload(@UploadedFiles() files, @Res() res, @Req() req) {
    
    const data: Array<Record<string, any>> = [];

    if(files){
      for(const file of files){
        if(file.size > 16783130){
          throw new HttpException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'File size must be less than 16M',
            errors: 'file size',
        }, HttpStatus.BAD_REQUEST);
        }
        data.push({
          destination: file.destination.replace('./static/', ''),
          type: file.mimetype.split('/')[0],
          extension: file.mimetype.split('/')[1],
          originalname: file.originalname,
          filename: file.filename,
          size: file.size,
          url: `${file.destination.replace('./static/', '')}/${file.filename}`,
          serverUrl: `${this.config.get('staticUrl')}`
        })
      }
    }

    return res.status(200).json(data)
  }

  @Post('api/remove')
    remove(@Body('path') path: string, @Res() res) {
      
      let status = true;
      try{fs.unlinkSync(`./static/${path}`)}
      catch(err){status = false; console.log(err.message)}
      return res.status(200).json(status);
  }
}
