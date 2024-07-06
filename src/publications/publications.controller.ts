/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Query, HttpStatus, UseInterceptors ,UploadedFile,} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { ApiHeader, ApiTags,ApiConsumes} from '@nestjs/swagger';
import { FilterPublicationDto } from './dto/filter-publication.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('publications')
@ApiHeader({
  name: 'lang',
  description: 'language',
})

@Controller('api/publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  create(@Body() body: CreatePublicationDto, @Res() res) {
    return this.publicationsService.create(body, res);
  }
  
  /*@Post() // Route pour créer une nouvelle publication
  @UseInterceptors(FileInterceptor('videoPath', {
    storage: diskStorage({
      destination: './uploads', // Répertoire pour les fichiers uploadés
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  @ApiConsumes('multipart/form-data')
  create(@Body() body: CreatePublicationDto, @UploadedFile() videoFile: Express.Multer.File, @Res() res) {
    if (videoFile) {
      body.videoPath = videoFile.path;
    } 
    return this.publicationsService.create(body, res);
  }*/

  @Get() // Route pour récupérer toutes les publications
  async findAll(@Query() params: FilterPublicationDto, @Res() res, @Req() req) {
    res.accountid = req.headers?.accountid;
    const data = await this.publicationsService.findAll(params, res);
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':_id') // Route pour récupérer une publication spécifique par son ID
  async findOne(@Param('_id') _id: string, @Res() res) {
    const data = await this.publicationsService.findOne(_id);
    res.status(HttpStatus.OK).json(data);
  }

  @Patch(':_id') // Route pour mettre à jour une publication existante
  update(@Param('_id') _id: string, @Body() body: UpdatePublicationDto, @Res() res) {
    return this.publicationsService.update(_id, body, res);
  }

  @Delete(':_id') // Route pour supprimer une publication par son ID
  remove(@Param('_id') _id: string, @Res() res) {
    return this.publicationsService.remove(_id, res);
  }
}
