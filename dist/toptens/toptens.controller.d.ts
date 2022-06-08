import { ToptensService } from './toptens.service';
import { CreateToptenDto } from './dto/create-topten.dto';
import { UpdateToptenDto } from './dto/update-topten.dto';
import { FilterToptenDto } from './dto/filter-topten.dto';
export declare class ToptensController {
    private readonly toptensService;
    constructor(toptensService: ToptensService);
    create(createToptenDto: CreateToptenDto, res: any): Promise<any>;
    findAll(body: FilterToptenDto, res: any): Promise<any>;
    findOne(_id: string, res: any): Promise<any>;
    update(_id: string, updateToptenDto: UpdateToptenDto, res: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
}
