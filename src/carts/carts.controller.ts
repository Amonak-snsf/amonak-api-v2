import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { FilterCart } from './dto/filter-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('carts')
@ApiHeader({
  name: 'lang',
  description: 'language', 
})
@Controller('api/carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto, @Res() res) {
    return this.cartsService.create(createCartDto, res);
  }

  @Get()
  findAll(@Query() params: FilterCart, @Res() res) {
    return this.cartsService.findAll(params, res);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string, @Res() res) {
    return this.cartsService.findOne(_id, res);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateCartDto: UpdateCartDto, @Res() res) {
    return this.cartsService.update(_id, updateCartDto, res);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string, @Res()res) {
    return this.cartsService.remove(_id, res);
  }
}
