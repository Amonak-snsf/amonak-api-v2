/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { CustomBankCard, hashPassword, userAddress } from 'src/utils/helpers';
import { all, destroy, exist, one, put, create } from 'src/utils/query';
import { FriendsService } from '../friends/friends.service';
import { FirstTime, FirstTimeDocument } from './entities/first-time.entity';
import { FirstDisplay, FirstDisplayDocument } from 'src/settings/entities/first-display.entity';

@Injectable()
export class UsersService {
  private data; // Propriété privée pour stocker les données temporaires

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, // Injecte le modèle User
    @InjectModel(FirstDisplay.name) private firstDisplayModel: Model<FirstDisplayDocument>, // Injecte le modèle FirstDisplay
    private friendsService: FriendsService, // Injecte le service FriendsService
    @InjectModel(FirstTime.name) private firstTimeModel: Model<FirstTimeDocument>, // Injecte le modèle FirstTime
  ) {}

  // Méthode pour créer un utilisateur pour la première fois
  async firstTimeCreate(body: any) {
    const data = await create(this.firstTimeModel, body); // Utilise la fonction create pour créer une nouvelle entrée dans le modèle FirstTime
    return data;
  }

  // Méthode pour obtenir tous les utilisateurs créés pour la première fois par utilisateur
  async findAllFirstTime(user: string) {
    const data = await all(this.firstTimeModel, { user: user, status: true }); // Utilise la fonction all pour obtenir les entrées correspondantes
    return data;
  }

  // Méthode pour obtenir toutes les premières affiches
  async findAllFirstDispaly() {
    const data = await all(this.firstDisplayModel, {}); // Utilise la fonction all pour obtenir toutes les entrées du modèle FirstDisplay
    return data;
  }

  // Méthode pour obtenir tous les utilisateurs avec des paramètres optionnels
  async findAll(params, res): Promise<User[]> {
    params = await this.searchParams(params); // Utilise searchParams pour transformer les paramètres de recherche
    const data = await all(this.userModel, params, null, { _id: -1 }, params.limit, null, null); // Utilise la fonction all pour obtenir les utilisateurs
    return res.status(HttpStatus.OK).json(data); // Retourne les données avec le statut 200 (OK)
  }

  // Méthode pour obtenir un utilisateur par ID
  async findOne(_id: string, res = null) {
    const data = await one(this.userModel, { _id: _id }); // Utilise la fonction one pour obtenir l'utilisateur par ID
    if (res) return res.status(HttpStatus.OK).json(data); // Si une réponse est fournie, retourne les données avec le statut 200 (OK)
    if (!res) return data; // Si aucune réponse n'est fournie, retourne simplement les données
  }

  // Méthode pour mettre à jour un utilisateur par ID
  async update(_id: string, upDto: UpdateUserDto, res) {
    const user = await exist(this.userModel, { _id: _id }); // Vérifie si l'utilisateur existe
    delete upDto.friends; // Supprime la propriété friends de upDto
    this.data = upDto; // Assigne upDto à la propriété data temporaire

    const bankCard = CustomBankCard(upDto.bankCard); // Utilise la fonction CustomBankCard pour traiter les informations de la carte bancaire
    const address = userAddress(upDto.address); // Utilise la fonction userAddress pour traiter l'adresse
    if (bankCard) {
      this.data.bankCard = bankCard; // Si une carte bancaire est présente, l'assigne à data
    }
    if (address) {
      this.data.address = address; // Si une adresse est présente, l'assigne à data
    }
    
    this.data.sectors = Array.isArray(upDto.sectors) ? upDto.sectors : [upDto.sectors]; // Transforme sectors en tableau si nécessaire
    if (user.sectors) {
      user.sectors.forEach(sector => {
        if (sector) this.data.sectors.unshift(sector); // Ajoute les secteurs existants en début de tableau
      });
    }

    if (upDto.password && upDto.password.length > 7) {
      this.data.password = await hashPassword(upDto.password); // Hash le mot de passe s'il est présent et valide
    }

    const data = await put(this.userModel, this.data, { _id: _id }); // Utilise la fonction put pour mettre à jour l'utilisateur
    return res.status(HttpStatus.OK).json(data); // Retourne les données avec le statut 200 (OK)
  }

  // Méthode pour supprimer un utilisateur par ID
  async remove(_id: string, res) {
    const data = await destroy(this.userModel, { _id: _id }); // Utilise la fonction destroy pour supprimer l'utilisateur
    return res.status(HttpStatus.OK).json(data); // Retourne les données avec le statut 200 (OK)
  }

  // Méthode pour transformer les paramètres de recherche
  async searchParams(params) {
    if (params.search) {
      params = {
        status: true,
        $or: [
          { userName: { $regex: new RegExp(params.search, 'i') } },
          { email: { $regex: new RegExp(params.search, 'i') } },
          { firstName: { $regex: new RegExp(params.search, 'i') } },
          { lastName: { $regex: new RegExp(params.search, 'i') } },
        ],
      };
    }

    if (params.followers) {
      params = { followers: { '$in': params.followers } };
    }

    if (params.sugestion && params.sugestion === 'true') {
      const userList = await this.friendsService.listSugestions(params.user);
      params = { _id: { '$nin': userList } };
    }

    if (params.friendRequest && params.friendRequest === 'true') {
      const userList = await this.friendsService.listFriendRequest(params.user);
      params = { _id: { '$in': userList } };
    }

    if (params.friend && params.friend === 'true') {
      const userList = await this.friendsService.listFriend(params.user);
      params = { _id: { '$in': userList } };
    }

    if (params.all && params.all === 'true') {
      const userList = await this.friendsService.listUsers(params.user);
      params = { _id: { '$nin': userList } };
    }

    return params; // Retourne les paramètres transformés
  }
}