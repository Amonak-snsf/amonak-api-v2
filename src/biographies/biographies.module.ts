import { Module } from "@nestjs/common";
import { BiographiesService } from "./biographies.service";
import { BiographiesController } from "./biographies.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/entities/user.entity";
import { ConfigModule } from "@nestjs/config";
import { Biography, BiographySchema } from "./entities/biography.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Biography.name, schema: BiographySchema },
    ]),
    ConfigModule,
  ],
  controllers: [BiographiesController],
  providers: [BiographiesService],
})
export class BiographiesModule {}
