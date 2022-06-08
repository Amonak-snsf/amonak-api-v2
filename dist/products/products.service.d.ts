import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './entities/product.entity';
export declare class ProductsService {
    private readonly productModel;
    private data;
    constructor(productModel: Model<ProductDocument>);
    create(createProductDto: CreateProductDto, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<any>;
    findOne(_id: string, res: any): Promise<any>;
    update(_id: string, updateProductDto: UpdateProductDto, res: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
}
