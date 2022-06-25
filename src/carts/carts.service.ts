import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, createIfne, destroy, one, put } from 'src/utils/query';
import { CartStatus } from './dto/cart-status.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument } from './entities/cart.entity';

@Injectable()
export class CartsService {
  private data;

  constructor(@InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>){}

  async create(createCartDto, res) {
    this.data = createCartDto;

    const data = await createIfne(this.cartModel, this.data, { user: this.data.user, status: CartStatus.unpaid, isWaiting: true })
    if(this.data.from && this.data.from == 'cart_item'){
      return data;
    }

    res.status(HttpStatus.OK).json(data);
  }

  async findAll(params, res) {
    
    const data = await all(this.cartModel, params, null, { _id: -1 }, params.limit, 'user', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

  async findOne(_id: string, res) {

    const data = await one(this.cartModel, { _id: _id }, null, 'user', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

  async update(_id: string, updateCartDto: UpdateCartDto, res) {
    
   updateCartDto.updatedAt = new Date()
    const data = await put(this.cartModel, updateCartDto, { _id: _id }, 'user', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

  async remove(_id: string, res) {
    
    const data = await destroy(this.cartModel, { _id: _id });

    res.status(HttpStatus.OK).json(data);
  }
}
