
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
import { FirstDisplay, FirstDisplaySchema } from "src/settings/entities/first-display.entity";

// Définition du module AuthModule
@Module({
  imports: [
    // Configuration de Mongoose pour les entités utilisées par le module
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema }, // Enregistrement de l'entité Token
      { name: User.name, schema: UserSchema },   // Enregistrement de l'entité User
      { name: SellerInfo.name, schema: SellerInfoSchema }, // Enregistrement de l'entité SellerInfo
      { name: Biography.name, schema: BiographySchema },   // Enregistrement de l'entité Biography
      { name: FirstDisplay.name, schema: FirstDisplaySchema }, // Enregistrement de l'entité FirstDisplay
    ]),
    ConfigModule, // Importation du module ConfigModule pour la gestion des configurations
    PassportModule, // Importation du module PassportModule pour l'authentification
    // Configuration du module JWT de manière asynchrone
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get("secret"), // Récupération de la clé secrète pour JWT à partir des configurations
        signOptions: { expiresIn: `${config.get("expire")}s` }, // Définition de la durée de validité des tokens
      }),
      inject: [ConfigService], // Injection du service de configuration
    }),
  ],
  // Définition des contrôleurs du module
  controllers: [AuthController],
  // Définition des fournisseurs de services du module
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  // Exportation des services pour les rendre disponibles dans d'autres modules
  exports: [AuthService],
})
export class AuthModule {} // Déclaration de la classe AuthModule
