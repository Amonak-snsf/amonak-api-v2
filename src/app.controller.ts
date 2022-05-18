/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Req, Res, UploadedFiles, UseInterceptors, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileDestination, allImageFileFilter } from 'src/utils/file-uploading';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
  upload(@UploadedFiles() files, @Res() res) {
    
    const data: Array<Record<string, any>> = [];

    if(files){
      for(const file of files){
        data.push({
          destination: file.destination.replace('./static/', ''),
          type: file.mimetype.split('/')[0],
          extension: file.mimetype.split('/')[1],
          originalname: file.originalname,
          filename: file.filename,
          size: file.size,
          url: `${file.destination.replace('./static/', '')}/${file.filename}`
        })
      }
    }
    return res.status(200).json(data)
  }

  @Get('static/:file_name')
    staticVideossUploads(@Param('file_name') file_name: string, @Res() res) {
      return res.sendFile(file_name, { root: './static' });
  }
}
