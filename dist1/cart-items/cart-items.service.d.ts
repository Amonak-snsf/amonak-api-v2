import { Model } from 'mongoose';
import { CartsService } from 'src/carts/carts.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemDocument } from './entities/cart-item.entity';
export declare class CartItemsService {
    private readonly cartItemModel;
    private cartService;
    private data;
    private cart;
    constructor(cartItemModel: Model<CartItemDocument>, cartService: CartsService);
    create(createCartItemDto: CreateCartItemDto, res: any): Promise<void>;
    findAll(params: any, res: any): Promise<void>;
    findOne(cart: string, res: any): Promise<void>;
    remove(_id: string, res: any): Promise<void>;
}