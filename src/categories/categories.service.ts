import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { all, createIfne, destroy, one, put } from 'src/utils/query';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>){}

  async create(createCategoryDto: CreateCategoryDto, res) {

    const data = await createIfne(this.categoryModel, createCategoryDto, { name: createCategoryDto.name });

    return res.status(HttpStatus.OK).json(data);
  }

  async findAll(params, res) {
    
    const data = await all(this.categoryModel, params, null, { _id: -1 }, params.limit);

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(_id: string, res) {
    
    const data = await one(this.categoryModel, { _id: _id });

    return res.status(HttpStatus.OK).json(data);
  }

  async update(_id: string, updateCategoryDto: UpdateCategoryDto, res) {
    
    const data = await put(this.categoryModel, updateCategoryDto, { _id: _id } );

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(_id: string, res) {
    
    const data = await destroy(this.categoryModel, { _id: _id });

    return res.status(HttpStatus.OK).json(data);
  }
}
