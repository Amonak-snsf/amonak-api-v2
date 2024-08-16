import { Module } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { CommentLikesController } from './comment-likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentLike, CommentLikeSchema } from './entities/comment-like.entity';
import { Comment, CommentSchema } from 'src/comments/entities/comment.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationModule } from 'src/notification/notification.module';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/entities/user.entity';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: CommentLike.name, schema: CommentLikeSchema },
    	{ name: Comment.name, schema: CommentSchema },
      { name: User.name, schema: UserSchema }
    ]),
    NotificationsModule, NotificationModule,UsersModule
  ],
  controllers: [CommentLikesController],
  providers: [CommentLikesService],
  exports: [CommentLikesService]
})
export class CommentLikesModule {}
