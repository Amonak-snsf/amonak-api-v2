import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './entities/product.entity';
export declare class ProductsService {
    private readonly productModel;
    private data;
    constructor(productModel: Model<ProductDocument>);
    create(createProductDto: CreateProductDto, files: any, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<any>;
    findOne(id: string, res: any): Promise<any>;
    update(id: string, updateProductDto: UpdateProductDto, files: any, res: any): Promise<any>;
    remove(id: string, res: any): Promise<any>;
}
