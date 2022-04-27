import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { diskStorage } from 'multer';
import { editFileName, fileDestination, imageFileFilter } from 'src/utils/file-uploading';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('categories')
@ApiHeader({
  name: 'lang',
  description: 'language', 
})

@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: fileDestination,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),
)

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile() file, @Res() res) {
    return this.categoriesService.create(createCategoryDto, file, res);
  }

  @Get()
  findAll(@Query() params: FilterCategoryDto, @Res() res) {
    return this.categoriesService.findAll(params, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.categoriesService.findOne(id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Res() res) {
    return this.categoriesService.update(id, updateCategoryDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    return this.categoriesService.remove(id, res);
  }
}
