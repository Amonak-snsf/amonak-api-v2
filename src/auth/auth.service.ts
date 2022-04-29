import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { Token, TokenDocument } from 'src/users/entities/token.entity';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { imagePerform } from 'src/utils/image-perform-url';
import { Biography, BiographyDocument } from 'src/biographies/entities/biography.entity';
import { SellerInfo, SellerInfoDocument } from 'src/seller-infos/entities/seller-info.entity';
import { Status } from 'src/seller-infos/dto/status-seller-info';
import { checkUsername, hashPassword } from 'src/utils/helpers';
const isOnline = require('is-online');

@Injectable()
export class AuthService {
  private data: any;
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, 
  @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  @InjectModel(Biography.name) private biographyModel: Model<BiographyDocument>,
  @InjectModel(SellerInfo.name) private sellerInfoModel: Model<SellerInfoDocument>,
  private configService: ConfigService, private mailService: MailService,
  private jwtService: JwtService
  ) {}

  async register(createAuthDto: CreateAuthDto, file, res): Promise<any>  {

    this.data = createAuthDto;
    this.data.password = await hashPassword(createAuthDto.password);
    if(!file){
      this.data.avatar = `/static/images/avatar/avatar.png`;
    }else{
      this.data.avatar = `/${file.path}`;
    }
    
    const user = await new this.userModel(this.data).save().catch(err => {
      return err;
    });

    if(user.keyPattern && user.keyPattern.email === 1){
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({statusCode: 400, message: ['email address is already use'], error: "Bad Request"});
    }
    
    this.sendUserConfirmation(user);
    await new this.biographyModel({ user: user._id}).save();
    await new this.sellerInfoModel({ user: user._id, status: Status.created }).save();
    
    return res.status(HttpStatus.CREATED).json({ message: 'Your are registered with success, Please check your mail to confirm your account !'});
}

  async checkToken(token: string, res){

    const fetch_token = await this.tokenModel.findOne({ _id: token}).exec()
    .catch(err => {
      return err;
    });

    if(!fetch_token.token){
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Invalid token !'});
    }

    return await res.status(HttpStatus.OK).json({ message: 'Valid token !', token: fetch_token.token });
  }

  async resentActivationEmail(email: string, res){

    const user = await this.userModel.findOne({ email: email }).exec();
    if(!user){
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'email not found' });
    }

    const is_online = await isOnline({ timeout: 1000 });
    if(is_online){
      this.sendUserConfirmation(user);
      return res.status(HttpStatus.OK).json({ message: 'Email send with success!' })
    }

    return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email not send. Please check your network!'});

  }

  async activate(token: number, res){

    let fetch_token = await this.tokenModel.findOne({token: token}).exec();
    if(!fetch_token){
      return res.status(HttpStatus.NOT_FOUND).json({
        type: 'token-error',
        message: 'We were unable to find a valid token. Your token may have expired.'
      });
    }

    let user = await this.userModel.findOneAndUpdate({ _id: fetch_token.user, status: false }, { status: true, isLog: true }).exec();

    if(!user){
      return res.status(HttpStatus.NOT_FOUND).json({
        type: 'user-error',
        message: 'This user\'s account is already activated'
      });
    }

    const log_user = await this.logUser(user);
    return res.status(HttpStatus.OK).json(log_user);

  }

  async sendResetPasswordRequest(email: string, res){

    const user = await this.userModel.findOne({ email: email }).exec();
    if(!user){
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'email not found' });
    }

    const is_online = await isOnline({ timeout: 1000 });
    if(is_online){
      this.sendResetPassswordRequestEmail(user);
      return res.status(HttpStatus.OK).json({ message: 'Email send with success!' })
    }

    return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email not send. Please check your network!'});
  }

  async resetPassword(body, res){

    const fetch_token = await this.tokenModel.findOne({ token: body.token }).exec();
    if(!fetch_token){
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Invalid token !'});
    }

   const password = await hashPassword(body.password);

   const update_user = await this.userModel.findByIdAndUpdate(fetch_token.user, { password: password}).exec();
   if(!update_user){
    return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found !'});
   }

   const log_user = await this.logUser(update_user);
   return res.status(HttpStatus.OK).json(log_user);

  }

  async login(body, res){

    const check_userName = await checkUsername(body);
    const user = await this.userModel.findOne(check_userName).exec();
    if(!user){
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found !'});
    }
    
    if(!bcrypt.compareSync(body.password, user.password)){
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({ message: 'Invalid password provided !'});
    }
    if(user.status === false){
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({ message: 'Your account has not been verified !'});
    }

    const log_user = await this.logUser(user);
    return res.status(HttpStatus.OK).json(log_user);
  }

  async checkEmail(email, res) {

    const user = await this.userModel.findOne({ email: email }).exec();
    if(!user){
      return res.status(HttpStatus.NOT_FOUND).json(false);
    }
    
    return res.status(HttpStatus.OK).json(true);
  }

  async sendUserConfirmation(user){

    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const url = `${this.configService.get('front_url')}/auth/activation`;
    await new this.tokenModel({ token: token, user: user._id}).save();

    this.mailService.sendUserConfirmation(user, token, url);
  }

  async sendResetPassswordRequestEmail(user){

    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const token_save = await new this.tokenModel({ token: token, user: user._id}).save();
    const url = `${this.configService.get('front_url')}/auth/reset-password/${token_save._id}`;

    this.mailService.resetPassword(user, url);
  }

  async logUser(user){
    const payload = { email: user.email, sub: user.__id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token: access_token,
      expiresIn: this.configService.get('expire'),
      user: imagePerform(user, this.configService.get('staticUrl'))
    };
  }

}
