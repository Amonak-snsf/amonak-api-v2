import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
export declare class CartItemsController {
    private readonly cartItemsService;
    constructor(cartItemsService: CartItemsService);
    create(createCartItemDto: CreateCartItemDto, res: any): Promise<void>;
    findAll(params: CreateCartItemDto, res: any): Promise<void>;
    findOne(cart: string, res: any): Promise<void>;
    remove(_id: string, res: any): Promise<void>;
}