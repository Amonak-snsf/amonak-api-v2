import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Res, UploadedFiles, Query } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { editFileName, fileDestination, imageFileFilter3 } from 'src/utils/file-uploading';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FilterComment } from './dto/filter-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comments')
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

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @UploadedFiles() files, @Res() res) {
    return this.commentsService.create(createCommentDto, files, res);
  }

  @Get()
  findAll(@Query() params: FilterComment, @Res() res) {
    return this.commentsService.findAll(params, res);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string, @Res() res) {
    return this.commentsService.findOne(_id, res);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateCommentDto: UpdateCommentDto, @Res() res) {
    return this.commentsService.update(_id, updateCommentDto, res);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string, @Res() res) {
    return this.commentsService.remove(_id, res);
  }
}
