import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, createIfne, destroy, one, put } from 'src/utils/query';
import { CartStatus } from './dto/cart-status.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument } from './entities/cart.entity';

@Injectable()
export class CartsService {
  private data;

  constructor(@InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>){}

  async create(createCartDto, res) {
    this.data = createCartDto;

    const data = await createIfne(this.cartModel, this.data, { user_id: this.data.user_id, status: CartStatus.unpaid, is_waiting: true })
    if(this.data.from && this.data.from == 'cart_item'){
      return data;
    }

    res.status(HttpStatus.OK).json(data);
  }

  async findAll(params, res) {
    
    const data = await all(this.cartModel, params, null, { created_at: -1 }, params.limit, 'user_id', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

  async findOne(id: string, res) {

    const data = await one(this.cartModel, { _id: id }, null, 'user_id', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

  async update(id: string, updateCartDto: UpdateCartDto, res) {
    
    const data = await put(this.cartModel, updateCartDto, { _id: id }, 'user_id', userDataPopulateWithTopten());

    res.status(HttpStatus.OK).json(data);
  }

  async remove(id: string, res) {
    
    const data = await destroy(this.cartModel, { _id: id });

    res.status(HttpStatus.OK).json(data);
  }
}
