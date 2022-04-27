import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
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

  @Get(':comment_id')
  findOne(@Param('comment_id') comment_id: string, @Res() res) {
    return this.commentLikesService.findOne(comment_id, res);
  }

  @Patch(':comment_id')
  update(@Param('comment_id') comment_id: string, @Body() updateCommentLikeDto: UpdateCommentLikeDto, @Res() res) {
    return this.commentLikesService.update(comment_id, updateCommentLikeDto, res);
  }

  @Delete(':comment_id')
  remove(@Param('comment_id') comment_id: string, @Body() updateCommentLikeDto: UpdateCommentLikeDto, @Res() res) {
    return this.commentLikesService.remove(comment_id, updateCommentLikeDto, res);
  }
}
