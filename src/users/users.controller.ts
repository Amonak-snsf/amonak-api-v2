import { Controller, Get, Body, Patch, Param, Delete, Res, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading';
import { FilterUserDto } from './dto/filter-user.dto';

/**
 * Api tags
 */
@ApiTags('users')
@ApiHeader({
  name: 'lang',
  description: 'language',
})
@Controller('api/')
export class UsersController {
  /**
   * Creates an instance of users controller.
   * @param usersService 
   */
  constructor(private readonly usersService: UsersService) { }

  /**
   * Gets users controller
   * @param body 
   * @param res 
   * @returns  
   */
  @Get('users')
  findAll(@Query() body: FilterUserDto, @Res() res) {
    return this.usersService.findAll(body, res);
  }

  /**
   * Gets users controller
   * @param id 
   * @param res 
   * @returns  
   */
  @Get('users/:id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.usersService.findOne(id, res);
  }

  /**
   * Patchs users controller
   * @param id 
   * @param updateUserDto 
   * @param file 
   * @param res 
   * @returns  
   */
  @Patch('users/:id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './static/images/avatar',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )

  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() file, @Res() res) {
    return this.usersService.update(id, updateUserDto, file, res);
  }

  /**
   * Deletes users controller
   * @param id 
   * @param res 
   * @returns  
   */
  @Delete('users/:id')
  remove(@Param('id') id: string, @Res() res) {
    return this.usersService.remove(id, res);
  }
}
