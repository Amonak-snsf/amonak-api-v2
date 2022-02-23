import { Controller, Get, Body, Patch, Param, Res } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { BiographiesService } from './biographies.service';
import { UpdateBiographyDto } from './dto/update-biography.dto';

@ApiTags('biography')
@ApiHeader({
  name: 'lang',
  description: 'language',
})
@Controller('api/biographies')
export class BiographiesController {
  constructor(private readonly biographiesService: BiographiesService) {}

  @Get(':user_id')
  findOne(@Param('user_id') user_id: string, @Res() res) {
    return this.biographiesService.findOne(user_id, res);
  }

  @Patch(':user_id')
  update(@Param('user_id') user_id: string, @Body() updateBiographyDto: UpdateBiographyDto, @Res() res) {
    return this.biographiesService.update(user_id, updateBiographyDto, res);
  }

}
