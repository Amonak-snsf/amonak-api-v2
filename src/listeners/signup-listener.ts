import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Biography, BiographyDocument } from "src/biographies/entities/biography.entity";
import { MailService } from "src/mail/mail.service";
import { Status } from "src/seller-infos/dto/status-seller-info";
import { SellerInfo, SellerInfoDocument } from "src/seller-infos/entities/seller-info.entity";
import { Token, TokenDocument } from "src/users/entities/token.entity";

@Injectable()
export class SignupListener{

    constructor(
        @InjectModel(Biography.name) private biographyModel?: Model<BiographyDocument>,
        @InjectModel(SellerInfo.name) private sellerInfoModel?: Model<SellerInfoDocument>,
        private configService?: ConfigService, private mailService?: MailService,
        @InjectModel(Token.name) private tokenModel?: Model<TokenDocument>,
        ){}

    @OnEvent('signup')
    handleSignupEvent(user){
        console.log(user);
        this.sendUserConfirmation(user);
        new this.biographyModel({ user: user._id }).save();
        new this.sellerInfoModel({ user: user._id, status: Status.accepted }).save();
    }

    saveSignup(data){
        this.sendUserConfirmation(data);
        new this.biographyModel({ user: data._id }).save();
        new this.sellerInfoModel({ user: data._id, status: Status.accepted }).save();
    }

    sendUserConfirmation(user){

       const token = Math.floor(1000 + Math.random() * 9000).toString();
       const url = `${this.configService.get('front_url')}/auth/activation`;
       new this.tokenModel({ token: token, user: user._id }).save();
    
       this.mailService.sendUserConfirmation(user, token, url);
    }
}