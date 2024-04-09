import { Controller, Get, Post, Body, Param, Delete, Res, Query, Patch } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

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

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateCartDto: UpdateCartItemDto, @Res() res) {
    return this.cartItemsService.update(_id, updateCartDto, res);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string, @Res() res) {
    return this.cartItemsService.remove(_id, res);
  }
}
