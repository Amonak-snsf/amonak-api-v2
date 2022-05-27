import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment, CommentSchema } from './entities/comment.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationManagement, PubManagementSchema } from 'src/publication-managements/entities/publication-management.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { CommentGateway } from './comment.gateway';
import { CommentLikesModule } from 'src/comment-likes/comment-likes.module' 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: PublicationManagement.name, schema: PubManagementSchema },
    ]),
    NotificationsModule,
    CommentLikesModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentGateway]
})
export class CommentsModule {}
