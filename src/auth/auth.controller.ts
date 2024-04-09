import { Controller, Get, Post, Body, Param, Res } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { EmailAuthDto } from "./dto/email-auth.dto";
import { TokenPasswordAuthDto } from "./dto/token-password-auth.dto";
import { UsernamePasswordAuthDto } from "./dto/username-password-auth.dto";

@ApiTags("auth")
@ApiHeader({
  name: "lang",
  description: "language",
})
@Controller("api/auths")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() createAuthDto: CreateAuthDto, @Res() res) {
    return this.authService.register(createAuthDto, res);
  }

  @Get("check-token/:tokenId")
  checkToken(@Param("tokenId") tokenId: string, @Res() res) {
    return this.authService.checkToken(tokenId, res);
  }

  @Post("resend-activation-email")
  resentActivationEmail(@Body() emailAuth: EmailAuthDto, @Res() res) {
    return this.authService.resentActivationEmail(emailAuth.email, res);
  }

  @Get("activate/:token")
  activate(@Param("token") token: number, @Res() res) {
    return this.authService.activate(token, res);
  }

  @Get("send-reset-password-request/:email")
  sendResetPasswordRequest(@Param("email") email: string, @Res() res) {
    return this.authService.sendResetPasswordRequest(email, res);
  }

  @Post("reset-password")
  resetPassword(@Body() body: TokenPasswordAuthDto, @Res() res) {
    return this.authService.resetPassword(body, res);
  }

  @Post("login")
  login(@Body() body: UsernamePasswordAuthDto, @Res() res) {
    return this.authService.login(body, res);
  }

  @Post("check-email")
  checkEmail(@Body() emailAuth: EmailAuthDto, @Res() res) {
    return this.authService.checkEmail(emailAuth.email, res);
  }

  @Get("check-auth/:userId")
  auth(@Param("userId") userId: string, @Res() res) {
    return this.authService.auth(userId, res);
  }
}
