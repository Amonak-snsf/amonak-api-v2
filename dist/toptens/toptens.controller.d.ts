import { ToptensService } from './toptens.service';
import { CreateToptenDto } from './dto/create-topten.dto';
import { UpdateToptenDto } from './dto/update-topten.dto';
import { FilterToptenDto } from './dto/filter-topten.dto';
export declare class ToptensController {
    private readonly toptensService;
    constructor(toptensService: ToptensService);
    create(createToptenDto: CreateToptenDto, files: any, res: any): Promise<any>;
    findAll(body: FilterToptenDto, res: any): Promise<any>;
    findOne(id: string, res: any): Promise<any>;
    update(id: string, updateToptenDto: UpdateToptenDto, res: any): Promise<any>;
    remove(id: string, res: any): Promise<any>;
}
