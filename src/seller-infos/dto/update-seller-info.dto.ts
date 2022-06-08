import { PartialType } from '@nestjs/swagger';
import { CreateSellerInfoDto } from './create-seller-info.dto';

export class UpdateSellerInfoDto extends PartialType(CreateSellerInfoDto) {}
