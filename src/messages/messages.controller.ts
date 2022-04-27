import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Res, HttpStatus, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileDestination, imageFileFilter3 } from 'src/utils/file-uploading';
import { FilterMessage } from './dto/filter-message.dto';

@ApiTags('messages')
@ApiHeader({
  name: 'lang',
  description: 'language', 
})
@UseInterceptors(
  FilesInterceptor('files', 5, {
    storage: diskStorage({
      destination: fileDestination,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter3,
}),
)

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto, @UploadedFiles() files, @Res() res) {

    const data = await this.messagesService.create(createMessageDto, files);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get()
  async findAll(@Query() params: FilterMessage, @Res() res) {

    const data = await this.messagesService.findAll(params);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {

    const data = await this.messagesService.findOne(id);

    return res.status(HttpStatus.OK).json(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto, @Res() res) {
   
    const data = await this.messagesService.update(id, updateMessageDto);

    return res.status(HttpStatus.OK).json(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {

    const data = await this.messagesService.remove(id);

    return res.status(HttpStatus).json(data);
  }
}
