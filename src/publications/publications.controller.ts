/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, HttpStatus } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { FilterPublicationDto } from './dto/filter-publication.dto';
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

  @Get()
  async findAll(@Query() params: FilterPublicationDto, @Res() res) {
    const data = await this.publicationsService.findAll(params, res);
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: string, @Res() res) {
    const data = await this.publicationsService.findOne(_id);
    res.status(HttpStatus.OK).json(data);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() body: UpdatePublicationDto, @Res() res) {
    return this.publicationsService.update(_id, body, res);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string, @Res() res) {
    return this.publicationsService.remove(_id, res);
  }
}
