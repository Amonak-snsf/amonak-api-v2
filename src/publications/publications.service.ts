/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';        
import mongoose, { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { saleBody, userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, one, put } from 'src/utils/query';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationType } from './dto/publication-type.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication, PublicationDocument } from './entities/publication.entity';
import { PubManagementType as type } from 'src/publication-managements/dto/publication-managements-type.dto';
import { PublicationManagementsService } from 'src/publication-managements/publication-managements.service'
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { ToptensService } from 'src/toptens/toptens.service';
import { NotificationService } from 'src/notification/notification.service';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
const isOnline = require("is-online");
var ObjectId = require('mongodb').ObjectID;

@Injectable()
export class PublicationsService {

  constructor(
    @InjectModel(Publication.name) private readonly publicationModel: Model<PublicationDocument>,
     private productService: ProductsService,
     private mailService: MailService,
     private pubManagementService: PublicationManagementsService,
     private configService: ConfigService,
     private userService: UsersService,
     private toptenService: ToptensService,
     private notificationService: NotificationService
  ){}

  async create(body: CreatePublicationDto, res) {

    

// Gérer la création de différents types de publications
    if((body.type === PublicationType.sendAlerte) || (body.type === PublicationType.sendAlerteTopten)){
      // Pour l'envoi des alertes
      const userId = body.user;
      const sender = await this.userService.findOne(userId);
      
      // Vérifier si en ligne pour envoyer des emails
      if(isOnline){
        const url = `${this.configService.get("frontUrl")}/home`;
        if(body.type === PublicationType.sendAlerte){
        // Envoyer un email d'alerte
        const publication = await this.findOne(body._id);
        try {
          this.mailService.alerte({
            publication: publication, 
            message: body.content, 
            map: body.map,
            sender: sender,
            staticUrl: this.configService.get("staticUrl")
          }, url)
        } catch (error) {
          console.log(error," sending mail")
        }
        
        }
        if(body.type === PublicationType.sendAlerteTopten){
          // Envoyer un email d'alerte
          const topten = await this.toptenService.findOne(body._id, null)
          try {
            this.mailService.topten({
              topten: topten, 
              sender: sender,
              staticUrl: this.configService.get("staticUrl")
            }, url)
          } catch (error) {
            console.log(error," sending mail")
          }
        }
      }
      return res.status(HttpStatus.OK).json({message: "publicationBackend.alerteSend"});
    }

     // Gérer la création de publication de vente
    if((body.type == PublicationType.sale) && !body.share){
      const product = await this.productService.create(saleBody({...body, from: 'publication'}), res);
      body.product = product._id;

      if (body.files && body.files.length > 0) {
      
        const userId = body.user;
        const user = await this.userService.findOne(userId); // Suppose que findOne renvoie un utilisateur avec un champ 'email'
        const userEmail = user?.email || 'unknownuser';
        const videoFile = body.files.find((file) => file.url);
         // Assurez-vous que l'utilisateur est un objet contenant l'email
        console.log('videoFile:', videoFile);
        if (videoFile && videoFile.url && videoFile.filename) {
          console.log('File URL:', videoFile.url);
          const videoPath = `${process.env.STATIC_URL}/${videoFile.url}`;
          console.log(videoPath)
          const {name} = path.parse(`${videoFile.originalname}`);
          
          const thumbnailDir = path.join(__dirname, '..', '..', 'static', 'uploads',`${userEmail}`, 'images');
          const thumbnailPath = path.join(thumbnailDir, `${name}.png`);
          console.log(body._id)
          await this.generateThumbnail(videoPath, thumbnailPath);
          
          const relativePath = path.relative(path.join(__dirname, '..', '..', 'static'), thumbnailPath);
          body.thumbnailPath = `${process.env.STATIC_URL}/${relativePath}`;
          body.thumbnailPath = path.normalize(body.thumbnailPath).replace(/\\/g, '/');
          console.log(body.thumbnailPath)

        } else {
          console.error("File or file URL is missing", body.files);
          // Handle missing URL, e.g., throw an error or log the issue
        }
      } else {
        console.error("Files array is missing or empty", body.files);
      }
/* groupe de personnes
      const notificationPayload = {
        title: 'Nouvelle article en vente',
        body: `${body.user} vient de mettre une article en vente. Profité! `,
        token: "eqMtsjiLYSoWNbl6muwoYX:APA91bEBwMXBB2MtJXFI5tesmDHH0Z0SR5ftyjv_wEg84AnhnDmYBsn8IQ5jExTbqfKA8t3qEWurxP7wl67QBzMjKa6kndF8bpwRXYgM7cAFfKHvfeo_wcYGG7jX1rNZ6Zn26pxPgFe2",  // Vous devez obtenir ce token au préalable
      };
      await this.notificationService.sendPush(notificationPayload);*/
    }
    // Gérer le partage des publications
    if(body.share && (body.type !== PublicationType.sale)){
      delete body.product
    }

// Créer la publication
const data = await create(this.publicationModel, body, 'user', userDataPopulateWithTopten());
    
 
    // Gérer le mécanisme de partage
    if(body.share){
      const userId = body.user;
      const user = await this.userService.findOne(userId); // Suppose que findOne renvoie un utilisateur avec un champ 'email'
      const userName = user?.userName;
      const pubManagement = {
        user: body.user, 
        publication: body.share, 
        type: PublicationType.share, 
        status: true, 
        reason: '',
        to: data.user._id
      }
      await this.pubManagementService.create(pubManagement, res)

          
      const sharedPublication = await this.publicationModel.findById(body.share).populate('user');
      const targetUser = sharedPublication?.user;
      const fcmToken = targetUser?.fcmToken;
      const notificationPayload = {
       
              title: 'Partage', 
              body: `${userName} a partagé votre publication`,
              token: fcmToken
            };
            await this.notificationService.sendPush(notificationPayload);
          
    }
    

    return res.status(HttpStatus.OK).json(data);

  } 

  async generateThumbnail(videoPath: string, thumbnailPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .on('end', () => {
          console.log('Thumbnail generated successfully');
          resolve();
        })
        .on('error', (err) => {
          console.error('Error generating thumbnail', err);
          reject(err);
        })
        .screenshots({
          count: 1,
          folder: path.dirname(thumbnailPath),
          filename: path.basename(thumbnailPath),
          size: '1080x1920'
        });
    });
  }



async findAll(params, res = {}) {
  // Trouver toutes les publications en fonction des paramètres
  const userId = res['accountid'];
 



  // Fonctionnalité de recherche
  if(params.search){
      params = { status: true, content: {$regex: new RegExp(params.search, 'i')}};
      
  }

  // Filtrer les publications en fonction de l'utilisateur et des types de gestion
  if(userId){
      const publicationIdArray = [];
      
      let query = {$or: [{user: userId, type: type.softDelete}, {type: type.softDeleteAll}]};
      

      const states = await this.pubManagementService.findAll(query);
    

      for(let value of states){
          if(value){
              publicationIdArray.push(value.publication);
          }
      }


      params = {...params, _id: {'$nin': publicationIdArray}};

      if(params.greaterThanObjectId){
          var oid = new Date(params.greaterThanObjectId);
          params = {limit: params.limit, status: true, _id: {'$nin': publicationIdArray}, createdAt: {'$lt': new Date(oid).toISOString()}};
      }
  }

  // Récupérer les publications
  const data = await all(this.publicationModel, params, null, { _id: -1 }, params.limit, 'user', userDataPopulateWithTopten());
  return data;
}

  // Trouver une publication spécifique par son ID
  async findOne(_id: string) {
    
    return await one(this.publicationModel, { _id: _id }, null, 'user', userDataPopulateWithTopten());
  }

   // Mettre à jour une publication spécifique par son ID avec les données fournies
  async update(_id: string, body: UpdatePublicationDto, res = null) {

    const data = await put(this.publicationModel, body, { _id: _id }, 'user', userDataPopulateWithTopten());

    if(res){
      return res.status(HttpStatus.OK).json(data);
    }
  }

  // Supprimer une publication spécifique par son ID
  async remove(_id: string, res) {
    
    const data = await destroy(this.publicationModel, { _id: _id });

    return res.status(HttpStatus.OK).json(data);
  }

}

