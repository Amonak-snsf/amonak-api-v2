import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('static/images/avatar/:file_name')
    staticImagesAvatar(@Param('file_name') file_name: string, @Res() res) {
      return res.sendFile(file_name, { root: './static/images/avatar' });
  }

  @Get('static/images/uploads/:file_name')
    staticImagesUploads(@Param('file_name') file_name: string, @Res() res) {
      return res.sendFile(file_name, { root: './static/images/uploads' });
  }


  @Get('static/videos/uploads/:file_name')
    staticVideosAvatar(@Param('file_name') file_name: string, @Res() res) {
      return res.sendFile(file_name, { root: './static/videos/uploads' });
  }

  @Get('static/:file_name')
    staticVideossUploads(@Param('file_name') file_name: string, @Res() res) {
      return res.sendFile(file_name, { root: './static' });
  }
}
