/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Friend, FriendSchema } from 'src/friends/entities/friend.entity';
import { FriendsModule } from '../friends/friends.module';
import { MessagesModule } from 'src/messages/messages.module';
import { FirstTime, FirstTimeSchema } from './entities/first-time.entity';
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Friend.name, schema: FriendSchema }, { name: FirstTime.name, schema: FirstTimeSchema }]), 
    ConfigModule, FriendsModule, MessagesModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
