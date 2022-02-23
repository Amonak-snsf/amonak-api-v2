import { Model } from 'mongoose';
import { UpdateBiographyDto } from './dto/update-biography.dto';
import { BiographyDocument } from './entities/biography.entity';
export declare class BiographiesService {
    private biographyModel;
    constructor(biographyModel: Model<BiographyDocument>);
    findOne(user_id: string, res: any): Promise<any>;
    update(user_id: string, upDto: UpdateBiographyDto, res: any): Promise<any>;
}
