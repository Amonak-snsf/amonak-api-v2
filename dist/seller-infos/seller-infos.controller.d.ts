import { SellerInfosService } from './seller-infos.service';
import { UpdateSellerInfoDto } from './dto/update-seller-info.dto';
import { UpdateSellerStatusDto } from './dto/update-seller-status.dto';
import { FilterSeller } from './dto/filter-seller.dto';
export declare class SellerInfosController {
    private readonly sellerInfosService;
    constructor(sellerInfosService: SellerInfosService);
    findAll(params: FilterSeller, res: any): Promise<import("./entities/seller-info.entity").SellerInfo[]>;
    findOne(user_id: string, res: any): Promise<any>;
    update(user_id: string, updateSellerInfoDto: UpdateSellerInfoDto, file: any, files: any, res: any): Promise<any>;
    manageSellerInfoStatus(user_id: string, upDto: UpdateSellerStatusDto, res: any): Promise<any>;
}
