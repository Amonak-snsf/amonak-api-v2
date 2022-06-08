import { Module } from '@nestjs/common';
import { ToptensService } from './toptens.service';
import { ToptensController } from './toptens.controller';
import { Topten, ToptenSchema } from './entities/topten.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Topten.name, schema: ToptenSchema }, { name: User.name, schema: UserSchema }]), 
    ConfigModule
  ],
  controllers: [ToptensController],
  providers: [ToptensService]
})
export class ToptensModule {}
