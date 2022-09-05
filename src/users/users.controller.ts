/* eslint-disable prettier/prettier */
import { Controller, Get, Body, Param, Delete, Res, Query, UseGuards, Patch, Put, Post, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { FilterUserDto } from './dto/filter-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('users')
@ApiHeaders([
  {name: 'lang', description: 'language'}
])

@Controller('api/')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post('first-times')
  async firstTimeCreate(@Body() body: any, @Res() res) {

    const data = await this.usersService.firstTimeCreate(body);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get('first-times/:user')
  async findOneFirstTime(@Param('user') user: string, @Res() res)  {

    const data = await this.usersService.findAllFirstTime(user);
    return res.status(HttpStatus.OK).json(data);
  }
  
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @Put('users/:_id')
  update(@Param('_id') _id: string, @Body() updateUserDto: UpdateUserDto, @Res() res) {
    return this.usersService.update(_id, updateUserDto, res);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @Delete('users/:_id')
  remove(@Param('_id') _id: string, @Res() res) {
    return this.usersService.remove(_id, res);
  }
}
