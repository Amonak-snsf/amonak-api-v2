import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Friend, FriendSchema } from 'src/friends/entities/friend.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Friend.name, schema: FriendSchema }]), 
    ConfigModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
