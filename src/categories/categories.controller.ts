import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@ApiHeader({
  name: 'lang',
  description: 'language', 
})

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Res() res) {
    return this.categoriesService.create(createCategoryDto, res);
  }

  @Get()
  findAll(@Query() params: FilterCategoryDto, @Res() res) {
    return this.categoriesService.findAll(params, res);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string, @Res() res) {
    return this.categoriesService.findOne(_id, res);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Res() res) {
    return this.categoriesService.update(_id, updateCategoryDto, res);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string, @Res() res) {
    return this.categoriesService.remove(_id, res);
  }
}
