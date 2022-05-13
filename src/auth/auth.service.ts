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
import { Biography, BiographyDocument } from 'src/biographies/entities/biography.entity';
import { SellerInfo, SellerInfoDocument } from 'src/seller-infos/entities/seller-info.entity';
import { Status } from 'src/seller-infos/dto/status-seller-info';
import { checkUsername, hashPassword, userAddress } from 'src/utils/helpers';
import { one, put, create, exist } from 'src/utils/query';
import { error } from 'src/utils/error';
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

    this.data.address = userAddress(Array.isArray(this.data.address)? this.data.address[0] : this.data.address);
    const user = await create(this.userModel, this.data);

    this.sendUserConfirmation(user);
    await new this.biographyModel({ user: user._id}).save();
    await new this.sellerInfoModel({ user: user._id, status: Status.created }).save();
    
    return res.status(HttpStatus.CREATED).json({status: true, message: 'Votre inscription a été faite avec succès. Veuillez vérifier votre boite e-mail pour confirmer votre compte!'});
}

  async checkToken(tokenId: string, res){

    await one(this.tokenModel, {  _id: tokenId });
    return await res.status(HttpStatus.OK).json({status: true, message: 'Valid token.'});
  }

  async resentActivationEmail(email: string, res){

    const user = await one(this.userModel, {email: email});
    const online = await isOnline({ timeout: 1000 });
    if(online){
      this.sendUserConfirmation(user);
      return res.status(HttpStatus.OK).json({status: true, message: 'Email send with success!'})
    }

    throw error({statusCode: HttpStatus.FORBIDDEN, message: 'Email not send. Please check your network!'}, HttpStatus.FORBIDDEN);
  }

  async activate(token: number, res){

    let fetchToken = await one(this.tokenModel, {token: token});

    if(!fetchToken){
      throw error({statusCode: HttpStatus.NOT_FOUND, message: 'Le code de confirmation que vous avez fourni est invalid.', display: true}, HttpStatus.NOT_FOUND);
    }

    let user = await put(this.userModel, {status: true, isLog: true}, { _id: fetchToken.user, status: false})

    const logUser = await this.logUser(user);
    return res.status(HttpStatus.OK).json(logUser);

  }

  async sendResetPasswordRequest(email: string, res){

    const user = await exist(this.userModel, { email: email });

    if(!user){
      throw error({statusCode: HttpStatus.NOT_FOUND, message: 'Ce compte n\'existe pas.', display: true}, HttpStatus.NOT_FOUND);
    }

    const online = await isOnline({ timeout: 1000 });
    if(online){
      this.sendResetPassswordRequestEmail(user);
      return res.status(HttpStatus.OK).json({status: true, message: 'Votre demande a été traité avec succès! Veuillez vérifier votre boite e-mail pour rénitialiser votre mot de passe.', display: true})
    }

    throw error({statusCode: HttpStatus.FORBIDDEN, message: 'Veuillez vérifier votre connexion internet!', display: true}, HttpStatus.FORBIDDEN);
  }

  async resetPassword(body, res){

   const fetchToken = await one(this.tokenModel, {token: body.token});
   const password = await hashPassword(body.password);

   const updateUser = await put(this.userModel, {password: password}, {_id: fetchToken.user});

   const logUser = await this.logUser(updateUser);
   return res.status(HttpStatus.OK).json(logUser);

  }

  async login(body, res){

    const checkUserName = await checkUsername(body);

    const user = await exist(this.userModel, checkUserName);

    if(!user){
      throw error({statusCode: HttpStatus.NOT_FOUND, message: 'Votre nom d\'utilisateur est incorrecte.', display: true}, HttpStatus.NOT_FOUND);
    } 

    if(!bcrypt.compareSync(body.password, user.password)){
      throw error({statusCode: HttpStatus.NOT_FOUND, message: 'Votre mot de passe est incorrecte.', display: true}, HttpStatus.NOT_FOUND);
    }
    if(user.status === false){
      throw error({statusCode: HttpStatus.NOT_FOUND, message: 'Votre compte n\'est pas encore activé.', display: true}, HttpStatus.NOT_FOUND);
    }

    const logUser = await this.logUser(user);
    return res.status(HttpStatus.OK).json(logUser);
  }

  async checkEmail(email, res) {

    await one(this.userModel, { email: email });

    return res.status(HttpStatus.OK).json({status: true});
  }

  async auth(userId: string, res){

    const data = await one(this.userModel, {_id: userId});

    return res.status(HttpStatus.OK).json(data);
  }

  async sendUserConfirmation(user){

    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const url = `${this.configService.get('front_url')}/account-activation`;
    await create(this.tokenModel, { token: token, user: user._id}) 

    this.mailService.sendUserConfirmation(user, token, url);
  }

  async sendResetPassswordRequestEmail(user){

    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const tokenSave = await new this.tokenModel({ token: token, user: user._id}).save();
    const url = `${this.configService.get('front_url')}/reset-password/${tokenSave._id}`;

    this.mailService.resetPassword(user, url);
  }

  async logUser(user){
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken: accessToken,
      expiresIn: this.configService.get('expire'),
      user: user
    };
  }

}
