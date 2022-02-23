import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument } from './entities/category.entity';
export declare class CategoriesService {
    private readonly categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    create(createCategoryDto: CreateCategoryDto, file: any, res: any): Promise<any>;
    findAll(params: any, res: any): Promise<any>;
    findOne(id: string, res: any): Promise<any>;
    update(id: string, updateCategoryDto: UpdateCategoryDto, res: any): Promise<any>;
    remove(id: string, res: any): Promise<any>;
}
