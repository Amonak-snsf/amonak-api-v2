import { Controller, Post,UploadedFile,UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ThumbnailService } from './thumbnail.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('thumbnail')
export class ThumbnailController {
    constructor(private readonly thumbnailService: ThumbnailService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const thumbnailPath = await this.thumbnailService.createThumbnail(
      file.path,
      './uploads/thumbnails',
    );

    return {
      message: 'Thumbnail created successfully',
      thumbnailPath,
    };
  } 
}
