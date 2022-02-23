import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Friend, FriendSchema } from './entities/friend.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Friend.name, schema: FriendSchema }]), 
    ConfigModule
  ],
  controllers: [FriendsController],
  providers: [FriendsService]
})
export class FriendsModule {}
