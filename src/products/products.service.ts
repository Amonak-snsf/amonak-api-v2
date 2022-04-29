import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { customFiles, userAddress, userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, one, put } from 'src/utils/query';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private data;

  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
  ){}

  async create(createProductDto: CreateProductDto, files, res) {

    const custom_files = customFiles(files);
    if(custom_files){
      createProductDto.files = custom_files;
    }
    
    const address = userAddress(createProductDto.address);
    if(address){
      createProductDto.address = address;
    }

    this.data = createProductDto;
    const from = this.data.from;
    delete this.data.from;
    
    const data = await create(this.productModel, this.data, 'user', userDataPopulateWithTopten());

    if(from == 'publication'){
      return data;
    }
    return await res.status(HttpStatus.OK).json(data);
    
  }

  async findAll(params, res) {
    
    if(params.search){
      params = {$or: [{name: {$regex: new RegExp(params.search, 'i')}}, {content: {$regex: new RegExp(params.search, 'i')}}, {price: {$regex: new RegExp(params.search, 'i')}}]}
    }

    const data = await all(this.productModel, params, null, { createdAt: -1 }, params.limit, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(_id: string, res) {
    
    const data = await one(this.productModel, { _id: _id }, null, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);
  }

  async update(_id: string, updateProductDto: UpdateProductDto, files, res) {

    const custom_files = customFiles(files);
    if(custom_files){
      updateProductDto.files = custom_files;
    }
    
    const address = userAddress(updateProductDto.address);
    if(address){
      updateProductDto.address = address;
    }

    const data = await put(this.productModel, updateProductDto, { _id: _id }, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(_id: string, res) {

   const data = await destroy(this.productModel, { _id: _id });

   return res.status(HttpStatus.OK).json(data);
  }
}
