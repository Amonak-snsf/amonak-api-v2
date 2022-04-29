import { Controller, Get, Post, Body, Param, Delete, Res, Query } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@ApiTags('cart-items')
@ApiHeader({
  name: 'lang',
  description: 'language', 
})

@Controller('api/cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto, @Res() res) {
    return this.cartItemsService.create(createCartItemDto, res);
  }

  @Get()
  findAll(@Query() params: CreateCartItemDto, @Res() res) {
    return this.cartItemsService.findAll(params, res);
  }

  @Get(':cart')
  findOne(@Param('cart') cart: string, @Res() res) {
    return this.cartItemsService.findOne(cart, res);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string, @Res() res) {
    return this.cartItemsService.remove(_id, res);
  }
}
