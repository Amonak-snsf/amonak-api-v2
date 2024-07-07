import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationsService } from 'src/notifications/notifications.service';
import { all, destroy, one, put } from 'src/utils/query';
import { CreateFriendDto } from './dto/create-friend.dto';
import { Status } from './dto/status-friend.dto';
import { Friend, FriendDocument } from './entities/friend.entity';

@Injectable()
export class FriendsService {

  constructor(@InjectModel(Friend.name) private friendModel: Model<FriendDocument>, 
  private notificationService: NotificationsService,) {}


// Liste les demandes d'amis pour un utilisateur donné
  async listFriendRequest(user: string){

    const userList: Array<string> = [];

    try {

 // Récupère toutes les demandes d'amis reçues par l'utilisateur
    const friends = await all(this.friendModel, { to: user, status: Status.requested });

    // Si des demandes d'amis sont trouvées, les ajouter à la liste
    if(friends && friends.length){

      for(let friend of friends){
        userList.push(friend.from)
      }
    }}
    catch (error) {
      // Gérer les erreurs potentielles
      console.error('Erreur lors de la récupération des demandes d\'amis :', error);
      throw new Error('Impossible de récupérer les demandes d\'amis');
    }

    return userList;
  }


// Récupère une amitié entre deux utilisateurs
  async one(data: {from: string, to: string}){

    const query = [{ from: data.from, to: data.to, status: Status.friend }, 
      { from: data.to, to: data.from, status: Status.friend }];
    const friend = await one(this.friendModel, { $or: query });
    return friend;
  }

  // Liste les amis d'un utilisateur donné
  async listFriend(user: string){
    
    const userList: Array<string> = [];
    const query = [{ from: user, status: Status.friend }, { to: user, status: Status.friend }];
    const friends = await all(this.friendModel, { $or: query });

  // Si des amis sont trouvés, les ajouter à la liste
    if(friends && friends.length){

      for(let friend of friends){
        if(`${friend.from}` === user){
          userList.push(friend.to)
        }
        if(`${friend.to}` === user){
          userList.push(friend.from)
        }
      }
    }
    
    return userList;
  }

  // Liste les suggestions d'amis pour un utilisateur donné

  async listSugestions(user: string){

    const userList: Array<string> = [];

    const query = [{ from: user}, { to: user }];
    
    const friends = await all(this.friendModel, { $or: query });
    userList.push(user)
    if(friends && friends.length){

      for(let friend of friends){
        if(`${friend.from}` === user){
          userList.push(friend.to)
        }
        if(`${friend.to}` === user){
          userList.push(friend.from)
        }
      }
    }
    return userList;
  }

//Liste les utilisateurs en relation avec un utilisateur donné (amis ou demandes)  
  async listUsers(user: string){

    const userList: Array<string> = [];

    // Récupère les amis et les demandes d'amis de l'utilisateur
    const query = [{ from: user}, { to: user }];
    
    const friends = await all(this.friendModel, { $or: query });
    userList.push(user)
    if(friends && friends.length){

      for(let friend of friends){
        if(`${friend.from}` === user){
          userList.push(friend.to)
        }
        if(`${friend.to}` === user){
          userList.push(friend.from)
        }
      }
    }
    return userList;
  }

  // Envoie une demande d'ami
  async send(cfDto: CreateFriendDto, res) {
    
    const query1 = [{ from: cfDto.from, to: cfDto.to }, { from: cfDto.to, to: cfDto.from }];
    const friend = await one(this.friendModel, { $or: query1 });

    // Vérifie si une demande d'ami existe déjà
    if(friend && friend.Status === Status.requested){
      return res.status(HttpStatus.OK).json({ message: 'friendRequest.friendshipExist'});
    }
     // Crée une nouvelle demande d'ami
    const from_request = await new this.friendModel({
      from: cfDto.from,
      to: cfDto.to,
      status: Status.requested
    }).save();

     // Crée une notification pour la demande d'ami
    await this.createNotification(cfDto.from, cfDto.to, 'friendRequest.send',  `${Status.requested}`);
    return res.status(HttpStatus.OK).json({ message: 'friendRequest.friendRequestSend'});
  }
  
  // Rejette une demande d'ami
  async reject(cfDto: CreateFriendDto, res) {

    const query1 = {$or: [{ from: cfDto.from, to: cfDto.to }, { to: cfDto.from, from: cfDto.to }]};
    const findOne = await one(this.friendModel, { ...query1, status:  Status.requested});
    if(findOne && `${findOne.from}` === cfDto.from){
      await destroy(this.friendModel, { _id: findOne._id });
      return res.status(HttpStatus.OK).json({ message: 'friendRequest.friendRequestCancel'});
    }
    else{
      const user = await put(this.friendModel, { status: Status.reject }, query1);
      await this.createNotification(cfDto.from, cfDto.to, 'friendRequest.reject',  `${Status.reject}`);
      return res.status(HttpStatus.OK).json({ message: 'friendRequest.friendRequestCancel'});
    }
    
  }

  // Accepte une demande d'ami
  async accept(cfDto: CreateFriendDto, res) {

    const query1 = {$or: [{ from: cfDto.from, to: cfDto.to }, { to: cfDto.from, from: cfDto.to }]};
    const user = await put(this.friendModel, { status: Status.friend }, query1);
    await this.createNotification(cfDto.from, cfDto.to, 'friendRequest.accept',  `${Status.friend}`);
    return await res.status(HttpStatus.OK).json({ message: 'friendRequest.friendRequestAccept'});
  }

// Bloque un utilisateur
  async block(cfDto: CreateFriendDto, res) {

    const query1 = {$or: [{ from: cfDto.from, to: cfDto.to }, { to: cfDto.from, from: cfDto.to }]};
    const user = await put(this.friendModel, { status: Status.block }, query1);

    // Crée une notification pour le blocage
    await this.createNotification(cfDto.from, cfDto.to, 'friendRequest.block',  `${Status.block}`);
    return await res.status(HttpStatus.OK).json({ message: 'friendRequest.friendRequestBloq'});
  }


  // Crée une notification
  async createNotification(from: string, to: string, content: string, type: string){

    const notificationBody = {
      from: from,
      to: to,
      content: content,
      type: type
    }

    await this.notificationService.create(notificationBody)
  }

}
