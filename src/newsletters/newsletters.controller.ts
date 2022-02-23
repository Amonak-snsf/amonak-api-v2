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
@Controller('newsletters')
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

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.newslettersService.findOne(id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsletterDto: UpdateNewsletterDto, @Res() res) {
    return this.newslettersService.update(id, updateNewsletterDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    return this.newslettersService.remove(id, res);
  }
}
