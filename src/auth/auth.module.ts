import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Token, TokenSchema } from "src/users/entities/token.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User, UserSchema } from "src/users/entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import {
  Biography,
  BiographySchema,
} from "src/biographies/entities/biography.entity";
import {
  SellerInfo,
  SellerInfoSchema,
} from "src/seller-infos/entities/seller-info.entity";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
      { name: User.name, schema: UserSchema },
      { name: SellerInfo.name, schema: SellerInfoSchema },
      { name: Biography.name, schema: BiographySchema },
    ]),
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get("secret"),
        signOptions: { expiresIn: `${config.get("expire")}s` },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
