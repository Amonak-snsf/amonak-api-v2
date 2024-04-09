import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.entity';
import { MessageGateway } from './message.gateway';
import { FriendsModule } from 'src/friends/friends.module';
import { User } from 'src/users/entities/user.entity';
import { UserSchema } from '../users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }, 
      { name: User.name, schema: UserSchema }]),
    FriendsModule
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessageGateway],
  exports: [MessagesService]
})
export class MessagesModule {}
