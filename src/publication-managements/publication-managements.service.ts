import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, one } from 'src/utils/query';
import { CreatePublicationManagementDto } from './dto/create-publication-management.dto';
import { PublicationManagement, PubManagementDocument } from './entities/publication-management.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationService } from 'src/notification/notification.service';
import { UsersService } from 'src/users/users.service';
import { PubManagementType as type } from './dto/publication-managements-type.dto';
@Injectable()
export class PublicationManagementsService {
  constructor(@InjectModel(PublicationManagement.name) private readonly pubmanegementModel: Model<PubManagementDocument>,
    private readonly notificationsService: NotificationsService,
    private readonly notificationService: NotificationService,
    private userService: UsersService,
    ){}
  // Méthode pour créer une gestion de publication
  async create(body: CreatePublicationManagementDto, res) {
    let alreadyLike = false; // Variable pour vérifier si la publication est déjà likée

    // Vérifie si le type est follow, share, save, like ou signale
    if(body.type ===  type.follow || body.type === type.share || body.type === type.save || body.type === type.like || body.type === type.signale){

      let content = (body.type === type.share) ? 'publicationBackend.shareYourPubliation' : 'publicationBackend.followYou'; // Définit le contenu de la notification en fonction du type
      if(body.type === type.save) content = 'publicationBackend.saveYourPublication';
      if(body.type === type.like) content = 'publicationBackend.likeYourPublication';
      if(body.type === type.signale) content = 'publicationBackend.signalYourPublication';

      // Si le type est like, vérifie si l'utilisateur a déjà liké la publication
      if(body.type === type.like){

        const mylikes = await this.findAll({type: type.like, publication: body.publication, user: body.user})

        if(mylikes && mylikes[0]){
          // Si déjà liké, supprime le like
          alreadyLike = true;
          this.remove(mylikes[0]._id, {});
        }
        // Sinon, crée une notification pour le like
        else{
        const userId = body.user;
        const user = await this.userService.findOne(userId); // Suppose que findOne renvoie un utilisateur avec un champ 'email'
        const userName = user?.userName;
          // Envoi de la notification via FCM
       const notificationPayload = {
        title: '',
        body: `${userName} a aimé votre publication `,
        token: "eqMtsjiLYSoWNbl6muwoYX:APA91bEBwMXBB2MtJXFI5tesmDHH0Z0SR5ftyjv_wEg84AnhnDmYBsn8IQ5jExTbqfKA8t3qEWurxP7wl67QBzMjKa6kndF8bpwRXYgM7cAFfKHvfeo_wcYGG7jX1rNZ6Zn26pxPgFe2",  // Vous devez obtenir ce token au préalable
      };
  
      await this.notificationService.sendPush(notificationPayload);

          /*const notificationBody ={
            from: body.user,
            to: body.to,
            publication: body.publication,
            content: content,
            type: body.type,
          }
          await this.notificationsService.create(notificationBody);*/
        }
        
       }

       // Pour les autres types, crée une notification
       else{
        const notificationBody ={
          from: body.user,
          to: body.to,
          publication: body.publication,
          content: content,
          type: body.type,
        }
        await this.notificationsService.create(notificationBody);
      }
      
    }
    // Crée la gestion de publication si ce n'est pas un like déjà existant
    if(!alreadyLike)return await create(this.pubmanegementModel, body);  
  } 

  // Méthode pour récupérer toutes les gestions de publications avec des filtres optionnels
  async findAll(params, res=null) {

    // Récupère les données en utilisant les paramètres, triées par `_id` décroissant
    const data = await all(this.pubmanegementModel, params, null, { _id: -1 }, params.limit, 'user', userDataPopulateWithTopten());

    // Retourne les données avec un statut 200 si une réponse est fournie, sinon retourne simplement les données
    if(res)return res.status(HttpStatus.OK).json(data);
    if(!res)return data;
  }

  // Méthode pour récupérer une gestion de publication spécifique par son identifiant
  async findOne(publication: string, params, res) {
    params.publication = publication;

    const data = await all(this.pubmanegementModel, params);

    return res.status(HttpStatus.OK).json(data);
  }

  // Méthode pour supprimer une gestion de publication spécifique par son identifiant
  async remove(_id: string, params, res=null) {

    const data = await destroy(this.pubmanegementModel, { _id: _id });

    if(res)return res.status(HttpStatus.OK).json(data);
    if(!res)return data;
  }
}
