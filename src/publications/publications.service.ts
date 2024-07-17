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
     private toptenService: ToptensService
  ){}

/*
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
*/


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
    
    }
    // Gérer le partage des publications
    if(body.share && (body.type !== PublicationType.sale)){
      delete body.product
    }


    // Créer la publication
    const data = await create(this.publicationModel, body, 'user', userDataPopulateWithTopten());
    
    // Gérer le mécanisme de partage
    if(body.share){
      const pubManagement = {
        user: body.user, 
        publication: body.share, 
        type: PublicationType.share, 
        status: true, 
        reason: '',
        to: data.user._id
      }
      await this.pubManagementService.create(pubManagement, res)
    }

    console.log('Checking files...');
    if (body.files && body.files.length > 0) {
      const videoFile = body.files.find((file) => file.url);
      console.log('videoFile:', videoFile);
      if (videoFile && videoFile.url) {
        console.log('File URL:', videoFile.url);
        data.videoPath = videoFile.url
        console.log(data.videoPath)
        const thumbnailPath = path.join(__dirname, '..', '..', 'uploads', `${data._id}.png`);
        await this.generateThumbnail(data.videoPath, thumbnailPath);
        data.thumbnailPath = thumbnailPath;
        await data.save();
      } else {
        console.error("File or file URL is missing", body.files);
        // Handle missing URL, e.g., throw an error or log the issue
      }
    } else {
      console.error("Files array is missing or empty", body.files);
    }

    return res.status(HttpStatus.OK).json(data);

  } 

   /* if (body.files) {
    
      const thumbnailPath = path.join(__dirname, '..','..', 'uploads', `${data._id}.png`);
      await this.generateThumbnail(data.file.url, thumbnailPath);
      data.thumbnailPath = thumbnailPath;
      await data.save();
        
       /*catch (error) {
        console.error("Error generating thumbnail:", error);
        // Handle error, e.g., notify the user or log the error
      }
    }*/
   /* if (body.videoPath) {

      const thumbnailPath = path.join(__dirname, '..','..', 'uploads', `${data._id}.png`);
      await this.generateThumbnail(body.videoPath, thumbnailPath);
      data.thumbnailPath = thumbnailPath;
      await data.save();
    }*/

    /*return res.status(HttpStatus.OK).json(data);

  }*/

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
/*
  async generateThumbnail(videoUrl: string): Promise<string> {
    const thumbnailsDir = path.join(__dirname, '..', 'thumbnails');

    // Ensure the thumbnails directory exists
    if (!fs.existsSync(thumbnailsDir)) {
      fs.mkdirSync(thumbnailsDir, { recursive: true });
      console.log("Thumbnails directory created:", thumbnailsDir);
    }

    const thumbnailPath = path.join(thumbnailsDir, ${new ObjectId()}.png);

    return new Promise((resolve, reject) => {
      ffmpeg(videoUrl)
        .on('end', () => resolve(thumbnailPath))
        .on('error', (err) => reject(err))
        .screenshots({
          count: 1,
          folder: path.dirname(thumbnailPath),
          filename: path.basename(thumbnailPath),
          size: '320x240'
        });
    });
  } 
*/

  // async generateThumbnail(videoPath: string, thumbnailPath: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     ffmpeg(videoPath)
  //       .on('end', () => {
  //         console.log('Thumbnail generated successfully');
  //         resolve();
  //       })
  //       .on('error', (err) => {
  //         console.error('Error generating thumbnail', err);
  //         reject(err);
  //       })
  //       .screenshots({
  //         count: 1,
  //         folder: path.dirname(thumbnailPath),
  //         filename: path.basename(thumbnailPath),
  //         size: '1080x1920'
  //       });
  //   });
  // }

async findAll(params, res = {}) {
  // Trouver toutes les publications en fonction des paramètres
  const userId = res['accountid'];
 

  console.log("userId:", userId); // Log userId

  // Fonctionnalité de recherche
  if(params.search){
      params = { status: true, content: {$regex: new RegExp(params.search, 'i')}};
      console.log("Search params:", params); // Log search params
  }

  // Filtrer les publications en fonction de l'utilisateur et des types de gestion
  if(userId){
      const publicationIdArray = [];
      console.log("Initial publicationIdArray:", publicationIdArray);
      let query = {$or: [{user: userId, type: type.softDelete}, {type: type.softDeleteAll}]};
      console.log("Query:", query); // Log query

      const states = await this.pubManagementService.findAll(query);
      console.log("States:", states); // Log states

      for(let value of states){
          console.log("Value:", value); // Log each value
          if(value){
              publicationIdArray.push(value.publication);
          }
      }

      console.log("Publication IDs to exclude:", publicationIdArray); // Log publicationIdArray

      params = {...params, _id: {'$nin': publicationIdArray}};
      console.log("Params after excluding publications:", params); // Log params after exclusion

      if(params.greaterThanObjectId){
          var oid = new Date(params.greaterThanObjectId);
          params = {limit: params.limit, status: true, _id: {'$nin': publicationIdArray}, createdAt: {'$lt': new Date(oid).toISOString()}};
          console.log("Params with greaterThanObjectId:", params); // Log params with greaterThanObjectId
      }
  }

  // Récupérer les publications
  const data = await all(this.publicationModel, params, null, { _id: -1 }, params.limit, 'user', userDataPopulateWithTopten());
  console.log("Data:", data); // Log final data
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
