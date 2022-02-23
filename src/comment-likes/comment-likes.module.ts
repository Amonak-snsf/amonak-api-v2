import { Module } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { CommentLikesController } from './comment-likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentLike, CommentLikeSchema } from './entities/comment-like.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CommentLike.name, schema: CommentLikeSchema }])
  ],
  controllers: [CommentLikesController],
  providers: [CommentLikesService]
})
export class CommentLikesModule {}
