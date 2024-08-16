import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment, CommentSchema } from './entities/comment.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationManagement, PubManagementSchema } from 'src/publication-managements/entities/publication-management.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationModule } from 'src/notification/notification.module';
import { CommentGateway } from './comment.gateway';
import { CommentLikesModule } from 'src/comment-likes/comment-likes.module' ;
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: PublicationManagement.name, schema: PubManagementSchema },
      { name: User.name, schema: UserSchema }
    ]),
    NotificationsModule,
    CommentLikesModule,
    NotificationModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentGateway]
})
export class CommentsModule {}
