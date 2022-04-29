import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, UploadedFiles, Put, Query } from '@nestjs/common';
import { SellerInfosService } from './seller-infos.service';
import { UpdateSellerInfoDto } from './dto/update-seller-info.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileDestination, imageFileFilter2, imageFileFilter3 } from 'src/utils/file-uploading';
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


@UseInterceptors(
  FileInterceptor('identityCard', {
    storage: diskStorage({
      destination: fileDestination,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter2,
  }),
  FilesInterceptor('files', 5, {
    storage: diskStorage({
      destination: fileDestination,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter3,
  }),
)
  @Patch('seller-requests/:user')
  update(@Param('user') user: string, @Body() updateSellerInfoDto: UpdateSellerInfoDto, @UploadedFile() file, @UploadedFiles() files, @Res() res) {
    return this.sellerInfosService.update(user, updateSellerInfoDto, file, files, res);
  }

  @Put('seller-managments/:user/status')
  manageSellerInfoStatus(@Param('user') user: string, @Body() upDto: UpdateSellerStatusDto, @Res() res) {
    return this.sellerInfosService.manageSellerInfoStatus(user, upDto.status, res);
  }
}