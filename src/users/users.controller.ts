import { Controller, Get, Body, Patch, Param, Delete, Res, Query, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading';
import { FilterUserDto } from './dto/filter-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
@ApiTags('users')
@ApiHeaders([
  {name: 'lang', description: 'language'}
])

@Controller('api/')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @Get('users')
  findAll(@Query() body: FilterUserDto, @Res() res) {

    return this.usersService.findAll(body, res);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @Get('users/:_id')
  findOne(@Param('_id') _id: string, @Res() res) {

    return this.usersService.findOne(_id, res);
  }

  @Patch('users/:_id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './static/images/avatar',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  update(@Param('_id') _id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() file, @Res() res) {

    return this.usersService.update(_id, updateUserDto, file, res);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @Delete('users/:_id')
  remove(@Param('_id') _id: string, @Res() res) {
    return this.usersService.remove(_id, res);
  }
}
