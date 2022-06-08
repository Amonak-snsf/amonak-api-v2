import { Model } from 'mongoose';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartDocument } from './entities/cart.entity';
export declare class CartsService {
    private readonly cartModel;
    private data;
    constructor(cartModel: Model<CartDocument>);
    create(createCartDto: any, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<void>;
    findOne(_id: string, res: any): Promise<void>;
    update(_id: string, updateCartDto: UpdateCartDto, res: any): Promise<void>;
    remove(_id: string, res: any): Promise<void>;
}
