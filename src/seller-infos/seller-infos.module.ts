import { Module } from '@nestjs/common';
import { SellerInfosService } from './seller-infos.service';
import { SellerInfosController } from './seller-infos.controller';
import { SellerInfo, SellerInfoSchema } from './entities/seller-info.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: SellerInfo.name, schema: SellerInfoSchema },
    { name: User.name, schema: UserSchema }
  ]), 
    ConfigModule,
    AuthModule
  ],
  controllers: [SellerInfosController],
  providers: [SellerInfosService]
})
export class SellerInfosModule {}
