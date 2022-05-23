import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, HttpStatus } from '@nestjs/common';
import { PublicationManagementsService } from './publication-managements.service';
import { CreatePublicationManagementDto } from './dto/create-publication-management.dto';
import { UpdatePublicationManagementDto } from './dto/update-publication-management.dto';
import { FilterPubManagment } from './dto/filter-pubmanagement.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('publication-managements')
@ApiHeader({
  name: 'lang',
  description: 'language',
})
@Controller('api/publication-managements')
export class PublicationManagementsController {
  constructor(private readonly publicationManagementsService: PublicationManagementsService) {}

  @Post()
  async create(@Body() body: CreatePublicationManagementDto, @Res() res) {
    const data = await this.publicationManagementsService.create(body, res);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get()
  findAll(@Query() params:FilterPubManagment, @Res() res) {
    return this.publicationManagementsService.findAll(params, res);
  }

  @Get(':publication')
  findOne(@Param('publication') publication: string, @Query() params:CreatePublicationManagementDto, @Res() res) {
    return this.publicationManagementsService.findOne(publication, params, res);
  }

  @Delete(':publication')
  remove(@Param('publication') publication: string, @Query() params:CreatePublicationManagementDto, @Res() res) {
    return this.publicationManagementsService.remove(publication, params, res);
  }
}
