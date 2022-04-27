import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { FilterNotification } from './dto/filter-notification.dto';

@ApiTags('notifications')
@ApiHeader({
  name: 'lang',
  description: 'language', 
})
@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto, @Res() res) {

    const data = await this.notificationsService.create(createNotificationDto);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get()
  async findAll(@Query() params: FilterNotification, @Res() res) {

    const data = await this.notificationsService.findAll(params);

    return res.status(HttpStatus.OK).json(data);
    
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query() params: FilterNotification, @Res() res) {
   
    const data = await this.notificationsService.findOne(id, params);

    return res.status(HttpStatus.OK).json(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto, @Res() res) {
    
    const data = await this.notificationsService.update(id, updateNotificationDto);

    return res.status(HttpStatus.OK).json(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {

    const data = await this.notificationsService.remove(id);

    return res.status(HttpStatus.OK).json(data);
  }
}
