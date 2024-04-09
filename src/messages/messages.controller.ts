/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { FilterMessage } from './dto/filter-message.dto';

@ApiTags('messages')
@ApiHeader({
  name: 'lang',
  description: 'language', 
})

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto, @Res() res) {

    const data = await this.messagesService.create(createMessageDto);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get()
  async findAll(@Query() params: FilterMessage, @Res() res) {

    const data = await this.messagesService.findAll(params);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: string, @Res() res) {

    const data = await this.messagesService.findOne(_id);

    return res.status(HttpStatus.OK).json(data);
  }

  @Patch(':_id')
  async update(@Param('_id') _id: string, @Body() updateMessageDto: UpdateMessageDto, @Res() res) {
   
    const data = await this.messagesService.update(_id, updateMessageDto);

    return res.status(HttpStatus.OK).json(data);
  }

  @Delete(':_id')
  async remove(@Param('_id') _id: string, @Res() res) {

    const data = await this.messagesService.remove(_id);

    return res.status(HttpStatus).json(data);
  }
}
