import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartsService } from 'src/carts/carts.service';
import { userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, createIfne, destroy, one, put } from 'src/utils/query';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItem, CartItemDocument } from './entities/cart-item.entity';

@Injectable()
export class CartItemsService {
  private data;
  private cart;

  constructor(
    @InjectModel(CartItem.name) private readonly cartItemModel: Model<CartItemDocument>,
    private cartService: CartsService
  ){}

  async create(createCartItemDto: CreateCartItemDto, res) {

    this.data = Array.isArray(createCartItemDto) ? createCartItemDto : [createCartItemDto];

    const cart = await this.cartService.create({ user: this.data[0].user, from: 'cart_item' }, res);
    if(cart && cart._id){
      this.cart = cart._id;
    }
    if(cart && cart.message == 'data already exist !'){
      this.cart = cart.body._id;
    }

    for (const item of this.data) {

      const data = await createIfne(this.cartItemModel, item, { cart: this.cart, product: item.product, price: item.price });
      if(data && data.message == 'data already exist !'){
        this.data = null;
        this.data.quantity = data.body.quantity + item.quantity;
        this.data.tax = item.tax ? item.tax : data.body.tax ;
        this.data.shipping =  item.shipping ? item.shipping : data.body.shipping;
        this.data.percentage = item.percentage ? item.percentage : data.body.percentage;
        await put(this.cartItemModel, this.data, { _id: data.body._id });
      }
    }
    
   const cart_data = await this.findOne(this.cart, res); 

   await res.status(HttpStatus.OK).json(cart_data);
  }

  async findAll(params, res) {
    
    const data = await all(this.cartItemModel, params, null, { _id: -1 }, params.limit, 'product');

    res.status(HttpStatus.OK).json(data);
  }

  async findOne(cart: string, res) {

    await one(this.cartItemModel, { cart: cart }, null, 'product').then(data =>{
      res.status(HttpStatus.OK).json(data.populate('user', userDataPopulateWithTopten()));
    });
    
  }


  async remove(_id: string, res) {
    
    const data = await destroy(this.cartItemModel, { _id: _id });

    res.status(HttpStatus.OK).json(data);
  }
}
