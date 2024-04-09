import { Module } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { CommentLikesController } from './comment-likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentLike, CommentLikeSchema } from './entities/comment-like.entity';
import { Comment, CommentSchema } from 'src/comments/entities/comment.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CommentLike.name, schema: CommentLikeSchema },
    	{ name: Comment.name, schema: CommentSchema },
    ]),
    NotificationsModule
  ],
  controllers: [CommentLikesController],
  providers: [CommentLikesService],
  exports: [CommentLikesService]
})
export class CommentLikesModule {}
