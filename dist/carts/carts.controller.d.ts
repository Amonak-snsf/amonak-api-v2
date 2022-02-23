import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { FilterCart } from './dto/filter-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    create(createCartDto: CreateCartDto, res: any): Promise<any>;
    findAll(params: FilterCart, res: any): Promise<void>;
    findOne(id: string, res: any): Promise<void>;
    update(id: string, updateCartDto: UpdateCartDto, res: any): Promise<void>;
    remove(id: string, res: any): Promise<void>;
}
