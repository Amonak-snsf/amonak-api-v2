import { HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { MailService } from "src/mail/mail.service";
import { Token, TokenDocument } from "src/users/entities/token.entity";
import { User, UserDocument } from "src/users/entities/user.entity";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { JwtService } from "@nestjs/jwt";
import {
  Biography,
  BiographyDocument,
} from "src/biographies/entities/biography.entity";
import {
  SellerInfo,
  SellerInfoDocument,
} from "src/seller-infos/entities/seller-info.entity";
import { Status } from "src/seller-infos/dto/status-seller-info";
import { checkUsername, hashPassword, userAddress } from "src/utils/helpers";
import { one, put, create, exist } from "src/utils/query";
import { error } from "src/utils/error";
import { FirstDisplay, FirstDisplayDocument } from "src/settings/entities/first-display.entity";
const isOnline = require("is-online");

@Injectable()
export class AuthService {
  private data: any;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    @InjectModel(FirstDisplay.name) private firstDisplayModel: Model<FirstDisplayDocument>,
    @InjectModel(Biography.name)
    private biographyModel: Model<BiographyDocument>,
    @InjectModel(SellerInfo.name)
    private sellerInfoModel: Model<SellerInfoDocument>,
    private configService: ConfigService,
    private mailService: MailService,
    private jwtService: JwtService
  ) {}

  async register(createAuthDto: CreateAuthDto, res): Promise<any> {
    await this.insertFirstTimeData();
    this.data = createAuthDto;
    this.data.password = await hashPassword(createAuthDto.password);

    this.data.address = userAddress(
      Array.isArray(this.data.address)
        ? this.data.address[0]
        : this.data.address
    );
    const user = await create(this.userModel, this.data);

    this.sendUserConfirmation(user);
    await new this.biographyModel({ user: user._id }).save();
    await new this.sellerInfoModel({
      user: user._id,
      status: Status.sellerPending,
    }).save();

    return res.status(HttpStatus.CREATED).json({
      status: true,
      message:
        "validation.register",
    });
  }

  async checkToken(tokenId: string, res) {
    await one(this.tokenModel, { _id: tokenId });
    return await res
      .status(HttpStatus.OK)
      .json({ status: true, message: "validation.checkToken" });
  }

  async resentActivationEmail(email: string, res) {

    const user = await one(this.userModel, { email: email });
    const online = await isOnline({ timeout: 1000 });
    if (online) {
      this.sendUserConfirmation(user);
      return res
        .status(HttpStatus.OK)
        .json({ status: true, message: "validation.resentActivationEmailSuccess" });
    }

    throw error(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: "validation.resentActivationEmailError",
      },
      HttpStatus.FORBIDDEN
    );
  }

  async activate(token: number, res) {
    const fetchToken = await one(this.tokenModel, { token: token });

    if (!fetchToken) {
      throw error(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "validation.activateAccount",
          display: true,
        },
        HttpStatus.NOT_FOUND
      );
    }

    const user = await put(
      this.userModel,
      { status: true, isLog: true },
      { _id: fetchToken.user, status: false }
    );

    const logUser = await this.logUser(user);
    return res.status(HttpStatus.OK).json(logUser);
  }

  async sendResetPasswordRequest(email: string, res) {
    const user = await exist(this.userModel, { email: email });

    if (!user) {
      throw error(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "validation.sendResetPasswordRequestFirstError",
          display: true,
        },
        HttpStatus.NOT_FOUND
      );
    }

    const online = await isOnline({ timeout: 1000 });
    if (online) {
      this.sendResetPassswordRequestEmail(user);
      return res.status(HttpStatus.OK).json({
        status: true,
        message:
          "validation.sendResetPasswordRequestSuccess",
        display: true,
      });
    }

    throw error(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: "validation.sendResetPasswordRequestLastError",
        display: true,
      },
      HttpStatus.FORBIDDEN
    );
  }

  async resetPassword(body, res) {
    const fetchToken = await one(this.tokenModel, { _id: body.token });
    if (!fetchToken) {
      throw error(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message:
            "validation.resetPassword",
          display: true,
        },
        HttpStatus.NOT_FOUND
      );
    }
    const password = await hashPassword(body.password);

    const updateUser = await put(
      this.userModel,
      { password: password, isLog: true },
      { _id: fetchToken.user }
    );

    const logUser = await this.logUser(updateUser);
    return res.status(HttpStatus.OK).json(logUser);
  }

  async login(body, res) {
    const checkUserName = await checkUsername(body);

    const user = await exist(this.userModel, checkUserName);
    if (!user) {
      throw error(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "validation.incorrecteUsername",
          display: true,
        },
        HttpStatus.NOT_FOUND
      );
    }

    if (!bcrypt.compareSync(body.password, user.password)) {
      throw error(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "validation.incorrectePassword",
          display: true,
        },
        HttpStatus.NOT_FOUND
      );
    }
    if (user.status === false) {
      throw error(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "validation.accountNotActivate",
          display: true,
        },
        HttpStatus.NOT_FOUND
      );
    }

    const logUser = await this.logUser(user);
    return res.status(HttpStatus.OK).json(logUser);
  }

  async checkEmail(email, res) {
    await one(this.userModel, { email: email });

    return res.status(HttpStatus.OK).json({ status: true });
  }

  async auth(userId: string, res) {
    const data = await one(this.userModel, { _id: userId });

    return res.status(HttpStatus.OK).json(data);
  }

  async sendUserConfirmation(user) {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const url = `${this.configService.get("frontUrl")}/account-activation`;
    await create(this.tokenModel, { token: token, user: user._id });

    try {
      this.mailService.sendUserConfirmation(user, token, url);
    } catch (error) {
      console.log(error," sending mail")
    }
  }

  async sendResetPassswordRequestEmail(user) {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const tokenSave = await new this.tokenModel({
      token: token,
      user: user._id,
    }).save();
    const url = `${this.configService.get("frontUrl")}/reset-password/${
      tokenSave._id
    }`;

    try {
      this.mailService.resetPassword(user, url);
    } catch (error) {
      console.log(error," sending mail")
    }
  }

  async logUser(user) {
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken: accessToken,
      expiresIn: this.configService.get("expire"),
      user: user,
    };
  }

  async insertFirstTimeData(){

    const body = [
      {
        title: "amonakTeam.title",
        subtitle: "amonakTeam.subtitle",
        displayNumber: "display1",
        logo: "../../../assets/imgs/amonak/n1.png",
        image: "../../../assets/imgs/amonak/feed1.png",
        buttonTitle: "amonakTeam.buttonTitle"
      },
      {
        title: "amonakTeam.title",
        subtitle: "amonakTeam.subtitle",
        displayNumber: "display2",
        logo: "../../../assets/imgs/amonak/n2.png",
        image: "../../../assets/imgs/amonak/feed3.png",
        buttonTitle: "amonakTeam.buttonTitle"
      },
      {
        title: "amonakTeam.title",
        subtitle: "amonakTeam.subtitle",
        displayNumber: "display3",
        logo: "../../../assets/imgs/amonak/n3.png",
        image: "../../../assets/imgs/amonak/feed3.png",
        buttonTitle: "amonakTeam.buttonTitle"
      },
      {
        title: "amonakTeam.title",
        subtitle: "amonakTeam.subtitle",
        displayNumber: "display4",
        logo: "../../../assets/imgs/amonak/n4.png",
        image: "../../../assets/imgs/amonak/feed4.png",
        buttonTitle: "amonakTeam.buttonTitle"
      },
      {
        title: "amonakTeam.title",
        subtitle: "amonakTeam.subtitle",
        displayNumber: "display5",
        logo: "../../../assets/imgs/amonak/n5.png",
        image: "../../../assets/imgs/amonak/feed5.png",
        buttonTitle: "amonakTeam.buttonTitle"
      }
    ];

    for (const value of body) {
      const data = await this.firstDisplayModel.findOne({displayNumber: value.displayNumber});
      if(!data?.displayNumber){
        await this.firstDisplayModel.create(value);
      }
    }
    
  }
}
