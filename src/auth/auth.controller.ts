// Importation des décorateurs et modules nécessaires de NestJS
import { Controller, Get, Post, Body, Param, Res } from "@nestjs/common";
// Importation de FileInterceptor (utilisé pour les fichiers téléchargés) de NestJS
import { FileInterceptor } from "@nestjs/platform-express";
// Importation des décorateurs Swagger pour la documentation de l'API
import { ApiHeader, ApiTags } from "@nestjs/swagger";
// Importation du service d'authentification
import { AuthService } from "./auth.service";
// Importation des DTOs (Data Transfer Objects) utilisés pour valider les données des requêtes
import { CreateAuthDto } from "./dto/create-auth.dto";
import { EmailAuthDto } from "./dto/email-auth.dto";
import { TokenPasswordAuthDto } from "./dto/token-password-auth.dto";
import { UsernamePasswordAuthDto } from "./dto/username-password-auth.dto";

// Déclaration de l'API tag pour la documentation Swagger
@ApiTags("auth")
// Déclaration de l'en-tête personnalisé pour la langue, utilisé dans toutes les requêtes de ce contrôleur
@ApiHeader({
  name: "lang",
  description: "language",
})
// Définition du contrôleur pour les routes d'authentification avec le chemin de base 'api/auths'
@Controller("api/auths")
export class AuthController {
  // Injection du service d'authentification via le constructeur
  constructor(private readonly authService: AuthService) {}

  // Route POST pour l'enregistrement d'un utilisateur
  @Post("register")
  register(@Body() createAuthDto: CreateAuthDto, @Res() res) {
    // Appel du service d'enregistrement avec les données reçues et l'objet de réponse
    return this.authService.register(createAuthDto, res);
  }

  // Route GET pour vérifier un token
  @Get("check-token/:tokenId")
  checkToken(@Param("tokenId") tokenId: string, @Res() res) {
    // Appel du service pour vérifier le token avec l'ID du token et l'objet de réponse
    return this.authService.checkToken(tokenId, res);
  }

  // Route POST pour renvoyer l'email d'activation
  @Post("resend-activation-email")
  resentActivationEmail(@Body() emailAuth: EmailAuthDto, @Res() res) {
    // Appel du service pour renvoyer l'email d'activation avec l'email reçu et l'objet de réponse
    return this.authService.resentActivationEmail(emailAuth.email, res);
  }

  // Route GET pour activer un compte avec un token
  @Get("activate/:token")
  activate(@Param("token") token: number, @Res() res) {
    // Appel du service pour activer le compte avec le token reçu et l'objet de réponse
    return this.authService.activate(token, res);
  }

  // Route GET pour envoyer une demande de réinitialisation de mot de passe
  @Get("send-reset-password-request/:email")
  sendResetPasswordRequest(@Param("email") email: string, @Res() res) {
    // Appel du service pour envoyer la demande de réinitialisation avec l'email reçu et l'objet de réponse
    return this.authService.sendResetPasswordRequest(email, res);
  }

  // Route POST pour réinitialiser le mot de passe
  @Post("reset-password")
  resetPassword(@Body() body: TokenPasswordAuthDto, @Res() res) {
    // Appel du service pour réinitialiser le mot de passe avec les données reçues et l'objet de réponse
    return this.authService.resetPassword(body, res);
  }

  // Route POST pour la connexion
  @Post("login")
  login(@Body() body: UsernamePasswordAuthDto, @Res() res) {
    // Appel du service de connexion avec les données reçues et l'objet de réponse
    return this.authService.login(body, res);
  }

  // Route POST pour vérifier l'existence d'un email
  @Post("check-email")
  checkEmail(@Body() emailAuth: EmailAuthDto, @Res() res) {
    // Appel du service pour vérifier l'email avec l'email reçu et l'objet de réponse
    return this.authService.checkEmail(emailAuth.email, res);
  }

  // Route GET pour vérifier l'authentification d'un utilisateur
  @Get("check-auth/:userId")
  auth(@Param("userId") userId: string, @Res() res) {
    // Appel du service pour vérifier l'authentification avec l'ID utilisateur reçu et l'objet de réponse
    return this.authService.auth(userId, res);
  }
}
