import { BiographiesService } from './biographies.service';
import { UpdateBiographyDto } from './dto/update-biography.dto';
export declare class BiographiesController {
    private readonly biographiesService;
    constructor(biographiesService: BiographiesService);
    findOne(user_id: string, res: any): Promise<any>;
    update(user_id: string, updateBiographyDto: UpdateBiographyDto, res: any): Promise<any>;
}
