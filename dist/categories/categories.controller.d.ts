import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto, file: any, res: any): Promise<any>;
    findAll(params: FilterCategoryDto, res: any): Promise<any>;
    findOne(id: string, res: any): Promise<any>;
    update(id: string, updateCategoryDto: UpdateCategoryDto, res: any): Promise<any>;
    remove(id: string, res: any): Promise<any>;
}
