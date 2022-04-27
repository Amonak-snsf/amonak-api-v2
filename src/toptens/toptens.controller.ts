import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Res, Query } from '@nestjs/common';
import { ToptensService } from './toptens.service';
import { CreateToptenDto } from './dto/create-topten.dto';
import { UpdateToptenDto } from './dto/update-topten.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileDestination, imageFileFilter } from 'src/utils/file-uploading';
import { FilterToptenDto } from './dto/filter-topten.dto';

@ApiTags('toptens')
@ApiHeader({
  name: 'lang',
  description: 'language',
})
@Controller('api/toptens')
export class ToptensController {
  constructor(private readonly toptensService: ToptensService) {}

  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: fileDestination,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
  }),
  )
  @Post()
  create(@Body() createToptenDto: CreateToptenDto, @UploadedFiles() files, @Res() res) {
    return this.toptensService.create(createToptenDto, files, res);
  }

  @Get()
  findAll(@Query() body: FilterToptenDto, @Res() res) {
    return this.toptensService.findAll(body, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.toptensService.findOne(id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToptenDto: UpdateToptenDto, @Res() res) {
    return this.toptensService.update(id, updateToptenDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    return this.toptensService.remove(id, res);
  }
}
