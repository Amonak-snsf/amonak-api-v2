import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Res, UploadedFile, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileDestination, imageFileFilter3 } from 'src/utils/file-uploading';
import { FilterProductDto } from './dto/filter-product.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
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
    fileFilter: imageFileFilter3,
}),
)

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @UploadedFiles() files, @Res() res) {
    return this.productsService.create(createProductDto, files, res);
  }

  @Get()
  findAll(@Query() params: FilterProductDto, @Res() res) {
    return this.productsService.findAll(params, res);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string, @Res() res) {
    return this.productsService.findOne(_id, res);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFiles() files, @Res() res) {
    return this.productsService.update(_id, updateProductDto, files, res);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string, @Res() res) {
    return this.productsService.remove(_id, res);
  }
}
