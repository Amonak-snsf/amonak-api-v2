/* eslint-disable prettier/prettier */
import { Controller, Get, Patch, Param, Res, Put, Query, Body } from '@nestjs/common';
import { SellerInfosService } from './seller-infos.service';
import { UpdateSellerInfoDto } from './dto/update-seller-info.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { UpdateSellerStatusDto } from './dto/update-seller-status.dto';
import { FilterSeller } from './dto/filter-seller.dto';
@ApiTags('sellerInfos')
@ApiHeader({
  name: 'lang',
  description: 'language',
})

@Controller('api/')
export class SellerInfosController {
  constructor(private readonly sellerInfosService: SellerInfosService) {}

  @Get('seller-infos')
  findAll(@Query() params: FilterSeller ,@Res() res) {
    return this.sellerInfosService.findAll(params, res);
  }

  @Get('seller-infos/:user')
  findOne(@Param('user') user: string, @Res() res) {
    return this.sellerInfosService.findOne(user, res);
  }


  @Patch('seller-requests/:user')
  update(@Param('user') user: string, @Body() updateSellerInfoDto: UpdateSellerInfoDto, @Res() res) {
    return this.sellerInfosService.update(user, updateSellerInfoDto, res);
  }

  @Put('seller-managments/:user/status')
  manageSellerInfoStatus(@Param('user') user: string, @Body() upDto: UpdateSellerStatusDto, @Res() res) {
    return this.sellerInfosService.manageSellerInfoStatus(user, upDto.status, res);
  }
}
