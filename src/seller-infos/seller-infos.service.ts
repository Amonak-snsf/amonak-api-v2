/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { AccountType } from 'src/users/dto/user-account-type.enum';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { userAddress, userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, one, put, create } from 'src/utils/query';
import { Status } from './dto/status-seller-info';
import { UpdateSellerInfoDto } from './dto/update-seller-info.dto';
import { SellerInfo, SellerInfoDocument } from './entities/seller-info.entity';

@Injectable()
export class SellerInfosService {
  private data;  // Stocke temporairement les données pour les mises à jour
  private accountType;  // Stocke le type de compte pour les utilisateurs

  constructor(
    @InjectModel(SellerInfo.name) private sellerInforModel: Model<SellerInfoDocument>,  // Injecte le modèle SellerInfo
    @InjectModel(User.name) private userModel: Model<UserDocument>,  // Injecte le modèle User
    private configService: ConfigService,  // Service de configuration pour accéder aux paramètres de l'application
    private mailService: MailService,  // Service pour l'envoi d'e-mails
  ) {}

  // Méthode pour trouver toutes les informations des vendeurs selon les paramètres fournis
  async findAll(params, res): Promise<SellerInfo[]> {
    const data = await all(
      this.sellerInforModel, 
      params, 
      null, 
      { _id: -1 }, 
      params.limit, 
      'user', 
      userDataPopulateWithTopten()  // Remplit les données utilisateur avec les dix premiers résultats
    );
    return res.status(HttpStatus.OK).json(data);  // Renvoie les données avec le statut HTTP OK
  }

  // Méthode pour trouver une seule information de vendeur par utilisateur
  async findOne(user: string, res) {
    const data = await one(
      this.sellerInforModel, 
      { user: user }, 
      null, 
      'user', 
      userDataPopulateWithTopten()
    );
    return res.status(HttpStatus.OK).json(data);  // Renvoie les données trouvées
  }

  // Méthode pour mettre à jour les informations du vendeur
  async update(user: string, upDto: UpdateSellerInfoDto, res) {
    this.data = upDto;

  // Traiter éventuellement l'adresse utilisateur
     const address = userAddress(upDto.address);
    if(address){
       this.data.address = address;
    }

    this.data.status = Status.sellerRequest;  // Définit le statut à la demande du vendeur

    const seller = await one(this.sellerInforModel, { user: user });
    if (seller) {
      await put(this.sellerInforModel, this.data, { user: user });  // Met à jour les infos du vendeur existant
    } else {
      await create(this.sellerInforModel, this.data);  // Crée de nouvelles infos du vendeur
    }

    this.accountType = AccountType.sellerRequest;  // Définit le type de compte à demande de vendeur
    const userUpdated = await put(this.userModel, { accountType: this.accountType }, { user: user });  // Met à jour le type de compte utilisateur

    return res.status(HttpStatus.OK).json(userUpdated);  // Renvoie les données utilisateur mises à jour
  }


  async manageSellerInfoStatus(user: string, status, res){

    await put(this.sellerInforModel, { status: status}, { user: user });
    const account = this.status(status);
    
    const resP = await put(this.userModel, { accountType: account }, { _id: user } );

    return res.status(HttpStatus.OK).json({ message: "User account status has been changed to "+this.accountType+" with success !"});
  }

  // Méthode auxiliaire pour déterminer le type de compte basé sur le statut
  status(status) {
    if (status == Status.seller) {
      this.accountType = AccountType.seller;
    }
    if (status == Status.sellerBloc) {
      this.accountType = AccountType.sellerBloc;
    }
    if (status == Status.sellerReject) {
      this.accountType = AccountType.sellerReject;
    }
    if (status == Status.sellerRequest) {
      this.accountType = AccountType.sellerRequest;
    }
    return this.accountType;  // Renvoie le type de compte déterminé
  }
}