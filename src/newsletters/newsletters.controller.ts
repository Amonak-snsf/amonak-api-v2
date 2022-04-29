import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Res, Query } from '@nestjs/common';
import { NewslettersService } from './newsletters.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { FilterNewsLetterDto } from './dto/filter-newsletter.dto';

@ApiTags('newsletters')
@ApiHeader({
  name: 'lang',
  description: 'language',
})
@Controller('api/newsletters')
export class NewslettersController {
  constructor(
    private readonly newslettersService: NewslettersService,
    ) {}

  @Post()
  create(@Body() createNewsletterDto: CreateNewsletterDto, @Res() res) {
    return this.newslettersService.create(createNewsletterDto, res);
  }

  @Get()
  findAll(@Query() params: FilterNewsLetterDto, @Res() res) {
    return this.newslettersService.findAll(params, res);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string, @Res() res) {
    return this.newslettersService.findOne(_id, res);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateNewsletterDto: UpdateNewsletterDto, @Res() res) {
    return this.newslettersService.update(_id, updateNewsletterDto, res);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string, @Res() res) {
    return this.newslettersService.remove(_id, res);
  }
}
