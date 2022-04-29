import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { EmailAuthDto } from './dto/email-auth.dto';
import { TokenPasswordAuthDto } from './dto/token-password-auth.dto';
import { UsernamePasswordAuthDto } from './dto/username-password-auth.dto';

@ApiTags('auth')
@ApiHeader({
  name: 'lang',
  description: 'language',
})
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Posts auth controller
   * @param createAuthDto 
   * @param file 
   * @param res 
   * @returns  
   */

  @Post('register')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './static/images/avatar',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )

  register(@Body() createAuthDto: CreateAuthDto, @UploadedFile() file, @Res() res) {
    return this.authService.register(createAuthDto, file, res);
  }

  /**
   * Gets auth controller
   * @param token 
   * @param res 
   * @returns  
   */
  @Get('check-token/:token')
  checkToken(@Param('token') token: string, @Res() res) {
    return this.authService.checkToken(token, res);
  }

  /**
   * Posts auth controller
   * @param emailAuth 
   * @param res 
   * @returns  
   */
  @Post('resend-activation-email')
  resentActivationEmail(@Body() emailAuth: EmailAuthDto, @Res() res) {
    return this.authService.resentActivationEmail(emailAuth.email, res);
  }

  /**
   * Gets auth controller
   * @param token 
   * @param res 
   * @returns  
   */

  @Get('activate/:token')
  activate(@Param('token') token: number, @Res() res) {
    return this.authService.activate(+token, res);
  }

  /**
   * Gets auth controller
   * @param email 
   * @param res 
   * @returns  
   */
  @Get('send-reset-password-request/:email')
  sendResetPasswordRequest(@Param('email') email: string, @Res() res) {
    return this.authService.sendResetPasswordRequest(email, res);
  }

  /**
   * Posts auth controller
   * @param body 
   * @param res 
   * @returns  
   */
  @Post('reset-password')
  resetPassword(@Body() body: TokenPasswordAuthDto, @Res() res) {
    return this.authService.resetPassword(body, res);
  }

  
  /**
   * Posts auth controller
   * @param body 
   * @param res 
   * @returns  
   */
  @Post('login')
  login(@Body() body: UsernamePasswordAuthDto, @Res() res) {
    return this.authService.login(body, res);
  }

  /**
   * Posts auth controller
   * @param emailAuth 
   * @param res 
   * @returns  
   */
  @Post('check-email')
  checkEmail(@Body() emailAuth: EmailAuthDto, @Res() res) {
    return this.authService.checkEmail(emailAuth.email, res);
  }
}
