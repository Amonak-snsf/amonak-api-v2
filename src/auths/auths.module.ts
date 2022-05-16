/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { AuthsGateway } from './auths.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  JwtModule.registerAsync({
    useFactory: async (config: ConfigService) => ({
      secret: config.get('secret'),
      signOptions: { expiresIn: `${config.get('expire')}s`},
    }),
    inject: [ConfigService],
  }),
],
  providers: [AuthsGateway],
})
export class AuthsModule {}
