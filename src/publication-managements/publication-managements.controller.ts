import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
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
@Controller('publication-managements')
export class PublicationManagementsController {
  constructor(private readonly publicationManagementsService: PublicationManagementsService) {}

  @Post()
  create(@Body() body: CreatePublicationManagementDto, @Res() res) {
    return this.publicationManagementsService.create(body, res);
  }

  @Get()
  findAll(@Query() params:FilterPubManagment, @Res() res) {
    return this.publicationManagementsService.findAll(params, res);
  }

  @Get(':publication_id')
  findOne(@Param('publication_id') publication_id: string, @Query() params:CreatePublicationManagementDto, @Res() res) {
    return this.publicationManagementsService.findOne(publication_id, params, res);
  }

  @Delete(':publication_id')
  remove(@Param('publication_id') publication_id: string, @Query() params:CreatePublicationManagementDto, @Res() res) {
    return this.publicationManagementsService.remove(publication_id, params, res);
  }
}
