import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, HttpStatus } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CommentLikesService } from './comment-likes.service';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';

@ApiTags('comments-likes')
@ApiHeader({
  name: 'lang',
  description: 'language', 
})

@Controller('api/comment-likes')
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @Post()
  create(@Body() createCommentLikeDto: CreateCommentLikeDto, @Res() res) {
    return this.commentLikesService.create(createCommentLikeDto, res);
  }

  @Get()
  findAll(@Query() params: UpdateCommentLikeDto, @Res() res) {
    return this.commentLikesService.findAll(params, res);
  }

  @Get(':comment')
  findOne(@Param('comment') comment: string, @Res() res) {
    const data = this.commentLikesService.findOne(comment);
    return res.status(HttpStatus.OK).json(data);
  }

  @Patch(':comment')
  update(@Param('comment') comment: string, @Body() updateCommentLikeDto: UpdateCommentLikeDto, @Res() res) {
    return this.commentLikesService.update(comment, updateCommentLikeDto, res);
  }

  @Delete(':comment')
  remove(@Param('comment') comment: string, @Body() updateCommentLikeDto: UpdateCommentLikeDto, @Res() res) {
    return this.commentLikesService.remove(comment, updateCommentLikeDto, res);
  }
}
