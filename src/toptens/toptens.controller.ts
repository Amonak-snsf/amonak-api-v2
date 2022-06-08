/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Res, Query } from '@nestjs/common';
import { ToptensService } from './toptens.service';
import { CreateToptenDto } from './dto/create-topten.dto';
import { UpdateToptenDto } from './dto/update-topten.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { FilterToptenDto } from './dto/filter-topten.dto';

@ApiTags('toptens')
@ApiHeader({
  name: 'lang',
  description: 'language',
})
@Controller('api/toptens')
export class ToptensController {
  constructor(private readonly toptensService: ToptensService) {}

  @Post()
  create(@Body() createToptenDto: CreateToptenDto, @Res() res) {

    return this.toptensService.create(createToptenDto, res);
  }

  @Get()
  findAll(@Query() body: FilterToptenDto, @Res() res) {

    return this.toptensService.findAll(body, res);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string, @Res() res) {

    return this.toptensService.findOne(_id, res);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateToptenDto: UpdateToptenDto, @Res() res) {

    return this.toptensService.update(_id, updateToptenDto, res);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string, @Res() res) {

    return this.toptensService.remove(_id, res);
  }
}
