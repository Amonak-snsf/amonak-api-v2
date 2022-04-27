import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Res, Query, UploadedFiles } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileDestination, imageFileFilter } from 'src/utils/file-uploading';
import { FilterPublicationDto } from './dto/filter-publication.dto';

@ApiTags('publications')
@ApiHeader({
  name: 'lang',
  description: 'language',
})

@UseInterceptors(
  FilesInterceptor('files', 5, {
    storage: diskStorage({
      destination: fileDestination,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
}),
)
@Controller('api/publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  create(@Body() body: CreatePublicationDto, @UploadedFiles() files, @Res() res) {
    return this.publicationsService.create(body, files, res);
  }

  @Get()
  findAll(@Query() params: FilterPublicationDto, @Res() res) {
    return this.publicationsService.findAll(params, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.publicationsService.findOne(id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdatePublicationDto, @Res() res) {
    return this.publicationsService.update(id, body, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    return this.publicationsService.remove(id, res);
  }
}
