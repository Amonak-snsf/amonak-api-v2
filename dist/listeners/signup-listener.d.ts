import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { BiographyDocument } from "src/biographies/entities/biography.entity";
import { MailService } from "src/mail/mail.service";
import { SellerInfoDocument } from "src/seller-infos/entities/seller-info.entity";
import { TokenDocument } from "src/users/entities/token.entity";
export declare class SignupListener {
    private biographyModel?;
    private sellerInfoModel?;
    private configService?;
    private mailService?;
    private tokenModel?;
    constructor(biographyModel?: Model<BiographyDocument>, sellerInfoModel?: Model<SellerInfoDocument>, configService?: ConfigService, mailService?: MailService, tokenModel?: Model<TokenDocument>);
    handleSignupEvent(user: any): void;
    saveSignup(data: any): void;
    sendUserConfirmation(user: any): void;
}
