import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@ApiHeader({
  name: 'lang',
  description: 'language', 
})

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @Res() res) {
    return this.productsService.create(createProductDto, res);
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
  update(@Param('_id') _id: string, @Body() updateProductDto: UpdateProductDto, @Res() res) {
    return this.productsService.update(_id, updateProductDto, res);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string, @Res() res) {
    return this.productsService.remove(_id, res);
  }
}
